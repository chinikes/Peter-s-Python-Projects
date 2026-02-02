typescript
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import winston from 'winston';
import cors from 'cors';
import helmet from 'helmet';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// ============================================================================
// Types and Interfaces
// ============================================================================

interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data: T | null;
}

interface UserResponse {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

interface AuditLog {
  timestamp: string;
  correlationId: string;
  ipAddress: string;
  email?: string;
  action: string;
  status: 'success' | 'failure';
  failureReason?: string;
  userAgent?: string;
}

// ============================================================================
// Configuration
// ============================================================================

const config = {
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
  passwordMinLength: 8,
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  port: parseInt(process.env.PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  dbConnectionString: process.env.DATABASE_URL || 'postgresql://localhost/registration_db',
};

// ============================================================================
// Logger Configuration
// ============================================================================

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'registration-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (config.nodeEnv !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// ============================================================================
// Database Setup
// ============================================================================

const pool = new Pool({
  connectionString: config.dbConnectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', { error: err });
});

// ============================================================================
// Redis Setup
// ============================================================================

const redis = new Redis(config.redisUrl);

redis.on('error', (err) => {
  logger.error('Redis connection error', { error: err });
});

redis.on('connect', () => {
  logger.info('Connected to Redis');
});

// ============================================================================
// Database Initialization
// ============================================================================

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        is_verified BOOLEAN DEFAULT FALSE
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY,
        correlation_id UUID NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        email VARCHAR(255),
        action VARCHAR(100),
        status VARCHAR(50),
        failure_reason TEXT,
        user_agent TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_audit_logs_correlation_id ON audit_logs(correlation_id);
      CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
      CREATE INDEX IF NOT EXISTS idx_audit_logs_ip_address ON audit_logs(ip_address);
    `);
    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize database', { error });
    throw error;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

function generateCorrelationId(): string {
  return uuidv4();
}

function getClientIpAddress(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

function validateEmailFormat(email: string): boolean {
  // RFC 5322 simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validatePasswordComplexity(password: string): {
  valid: boolean;
  missingRequirements: string[];
} {
  const missingRequirements: string[] = [];

  if (password.length < config.passwordMinLength) {
    missingRequirements.push(
      `minimum ${config.passwordMinLength} characters`
    );
  }

  if (!/[A-Z]/.test(password)) {
    missingRequirements.push('at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    missingRequirements.push('at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    missingRequirements.push('at least one number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    missingRequirements.push('at least one special character');
  }

  return {
    valid: missingRequirements.length === 0,
    missingRequirements,
  };
}

function sanitizeInput(input: string): string {
  return input.trim().toLowerCase();
}

async function logAuditEvent(auditLog: AuditLog): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO audit_logs (id, correlation_id, timestamp, ip_address, email, action, status, failure_reason, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        uuidv4(),
        auditLog.correlationId,
        auditLog.timestamp,
        auditLog.ipAddress,
        auditLog.email || null,
        auditLog.action,
        auditLog.status,
        auditLog.failureReason || null,
        auditLog.userAgent || null,
      ]
    );
  } catch (error) {
    logger.error('Failed to log audit event', { error, auditLog });
  }
}

// ============================================================================
// Middleware
// ============================================================================

// Request correlation ID middleware
function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const correlationId = generateCorrelationId();
  res.setHeader('X-Correlation-ID', correlationId);
  (req as any).correlationId = correlationId;
  next();
}

// HTTPS enforcement middleware
function httpsEnforcementMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (config.nodeEnv === 'production' && req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(308, `https://${req.header('host')}${req.url}`);
  }
  next();
}

// Rate limiting middleware
const registrationRateLimiter = rateLimit({
  store: new (require('rate-limit-redis'))({
    client: redis,
    prefix: 'rl:register:',
  }),
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  keyGenerator: (req: Request) => getClientIpAddress(req),
  handler: (req: Request, res: Response) => {
    const clientIp = getClientIpAddress(req);
    const correlationId = (req as any).correlationId;

    logger.warn('Rate limit exceeded', {
      correlationId,
      ipAddress: clientIp,
      action: 'register',
    });

    logAuditEvent({
      timestamp: new Date().toISOString(),
      correlationId,
      ipAddress: clientIp,
      action: 'register',
      status: 'failure',
      failureReason: 'rate_limit_exceeded',
      userAgent: req.get('user-agent'),
    }).catch((error) =>
      logger.error('Failed to log rate limit audit event', { error })
    );

    const response: ApiResponse = {
      status: 'error',
      message: 'Too many registration attempts. Please try again later.',
      data: null,
    };

    res.status(429).json(response);
  },
});

// CORS middleware
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || config.corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// ============================================================================
// Validation Middleware
// ============================================================================

const registrationValidationRules = () => [
  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .custom((value) => {
      if (!validateEmailFormat(value)) {
        throw new Error(
          'Invalid email format. Please provide a valid email address.'
        );
      }
      return true;
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .custom((value) => {
      const validation = validatePasswordComplexity(value);
      if (!validation.valid) {
        throw new Error(
          `Password must contain: ${validation.missingRequirements.join(', ')}`
        );
      }
      return true;
    }),

  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('First name must not exceed 255 characters'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Last name must not exceed 255 characters'),
];

function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const clientIp = getClientIpAddress(req);
    const correlationId = (req as any).correlationId;
    const email = req.body.email || 'unknown';

    const failureReasons = errors
      .array()
      .map((err) => `${err.param}: ${err.msg}`)
      .join('; ');

    logger.warn('Validation failed', {
      correlationId,
      ipAddress: clientIp,
      email,
      failureReasons,
    });

    logAuditEvent({
      timestamp: new Date().toISOString(),
      correlationId,
      ipAddress: clientIp,
      email,
      action: 'register',
      status: 'failure',
      failureReason: `validation_error: ${failureReasons}`,
      userAgent: req.get('user-agent'),
    }).catch((error) =>
      logger.error('Failed to log validation audit event', { error })
    );

    const response: ApiResponse = {
      status: 'error',
      message: 'Validation failed',
      data: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    };

    return res.status(400).json(response);
  }
  next();
}

// ============================================================================
// Registration Controller
// ============================================================================

async function handleRegistration(
  req: Request,
  res: Response
): Promise<Response> {
  const correlationId = (req as any).correlationId;
  const clientIp = getClientIpAddress(req);
  const userAgent = req.get('user-agent');

  const { email, password, firstName, lastName } = req.body as RegisterRequest;

  const client = await pool.connect();

  try {
    // Begin transaction
    await client.query('BEGIN');

    // Check for existing user
    const existingUserResult = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUserResult.rows.length > 0) {
      await client.query('ROLLBACK');

      logger.warn('Registration failed - duplicate email', {
        correlationId,
        ipAddress: clientIp,
        email,
      });

      logAuditEvent({
        timestamp: new Date().toISOString(),
        correlationId,
        ipAddress: clientIp,
        email,
        action: 'register',
        status: 'failure',
        failureReason: 'duplicate_email',
        userAgent,
      }).catch((error) =>
        logger.error('Failed to log duplicate email audit event', { error })
      );

      const response: ApiResponse = {
        status: 'error',
        message: 'User with this email already exists',
        data: null,
      };

      return res.status(409).json(response);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, config.bcryptSaltRounds);

    // Create user record
    const userId = uuidv4();
    const createdAt = new Date().toISOString();

    await client.query(
      `INSERT INTO users (id, email, password_hash, first_name, last_name, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, email, passwordHash, firstName || null, lastName || null, createdAt, createdAt]
    );

    // Commit transaction
    await client.query('COMMIT');

    // Log successful registration
    logger.info('User registered successfully', {
      correlationId,
      ipAddress: clientIp,
      email,
      userId,
    });

    logAuditEvent({
      timestamp: new Date().toISOString(),
      correlationId,
      ipAddress: clientIp,
      email,
      action: 'register',
      status: 'success',
      userAgent,
    }).catch((error) =>
      logger.error('Failed to log success audit event', { error })
    );

    const userResponse: UserResponse = {
      userId,
      email,
      createdAt,
    };

    if (firstName) {
      userResponse.firstName = firstName;
    }

    if (lastName) {
      userResponse.lastName = lastName;
    }

    const response: ApiResponse<UserResponse> = {
      status: 'success',
      message: 'User registered successfully',
      data: userResponse,
    };

    return res.status(201).json(response);
  } catch (error) {
    // Rollback transaction
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      logger.error('Failed to rollback transaction', { error: rollbackError });
    }

    if (error instanceof Error && error.message.includes('duplicate key')) {
      // Handle race condition
      logger.warn('Duplicate key error after check - race condition detected', {
        correlationId,
        ipAddress: clientIp,
        email,
        error,
      });

      logAuditEvent({
        timestamp: new Date().toISOString(),
        correlationId,
        ipAddress: clientIp,
        email,
        action: 'register',
        status: 'failure',
        failureReason: 'duplicate_email_race_condition',
        userAgent,
      }).catch((logError) =>
        logger.error('Failed to log race condition audit event', { error: logError })
      );

      const response: ApiResponse = {
        status: 'error',
        message: 'User with this email already exists',
        data: null,
      };

      return res.status(409).json(response);
    }

    logger.error('Database error during registration', {
      correlationId,
      ipAddress: clientIp,
      email,
      error,
    });

    logAuditEvent({
      timestamp: new Date().toISOString(),
      correlationId,
      ipAddress: clientIp,
      email,
      action: 'register',
      status: 'failure',
      failureReason: 'database_error',
      userAgent,
    }).catch((logError) =>
      logger.error('Failed to log database error audit event', { error: logError })
    );

    const response: ApiResponse = {
      status: 'error',
      message: 'An error occurred during registration. Please try again later.',
      data: null,
    };

    return res.status(500).json(response);
  } finally {
    client.release();
  }
}

// ============================================================================
// Express App Setup
// ============================================================================

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));

// Request processing middleware
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(correlationIdMiddleware);
app.use(httpsEnforcementMiddleware);

// ============================================================================
// Routes
// ============================================================================

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Service is running',
    data: { timestamp: new Date().toISOString() },
  });
});

// Registration endpoint
app.post(
  '/api/auth/register',
  registrationRateLimiter,
  registrationValidationRules(),
  handleValidationErrors,
  (req: Request, res: Response) => handleRegistration(req, res)
);

// 404 handler
app.use((req: Request, res: Response) => {
  const response: ApiResponse = {
    status: 'error',
    message: 'Endpoint not found',
    data: null,
  };
  res.status(404).json(response);
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', {
    error: err,
    correlationId: (req as any).correlationId,
    path: req.path,
    method: req.method,
  });

  const response: ApiResponse = {
    status: 'error',
    message: 'An unexpected error occurred. Please try again later.',
    data: null,
  };

  res.status(500).json(response);
});

// ============================================================================
// Server Startup
// ============================================================================

async function start() {
  try {
    await initializeDatabase();
    
    app.listen(config.port, () => {
      logger.info(`Registration API server started on port ${config.port}`, {
        environment: config.nodeEnv,
        port: config.port,
      });
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await pool.end();
  redis.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  await pool.end();
  redis.disconnect();
  process.exit(0);
});

// Start server
start().catch((error) => {
  logger.error('Fatal startup error', { error });
  process.exit(1);
});

export default app;

typescript
// .env.example
NODE_ENV=development
PORT=3001
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/registration_db

# Redis
REDIS_URL=redis://localhost:6379

# Security
BCRYPT_SALT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

typescript
// tests/registration.test.ts
import request from 'supertest';
import app from '../src/index';
import { Pool } from 'pg';
import Redis from 'ioredis';

describe('Registration API', () => {
  let pool: Pool;
  let redis: Redis;

  beforeAll(async () => {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    redis = new Redis(process.env.REDIS_URL);
  });

  afterEach(async () => {
    // Clear test data
    await pool.query('DELETE FROM users WHERE email LIKE ?', ['%test%']);
    // Clear rate limit cache
    await redis.flushdb();
  });

  afterAll(async () => {
    await pool.end();
    redis.disconnect();
  });

  describe('POST /api/auth/register', () => {
    test('should successfully register a new user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'SecurePass123!',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.userId).toBeDefined();
      expect(response.body.data.email).toBe('newuser@example.com');
      expect(response.body.data.firstName).toBe('John');
      expect(response.body.data.lastName).toBe('Doe');
      expect(response.body.data).not.toHaveProperty('password');
    });

    test('should reject request with missing email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          password: 'SecurePass123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('Validation failed');
    });

    test('should reject request with missing password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    test('should reject invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'SecurePass123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.data[0].message).toContain('Invalid email format');
    });

    test('should reject password with insufficient complexity', async () => {
      const testCases = [
        { password: 'short', reason: 'too short' },
        { password: 'nouppercase123!', reason: 'no uppercase' },
        { password: 'NOLOWERCASE123!', reason: 'no lowercase' },
        { password: 'NoNumbers!', reason: 'no numbers' },
        { password: 'NoSpecial123', reason: 'no special characters' },
      ];

      for (const testCase of testCases) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: 'test@example.com',
            password: testCase.password,
          });

        expect(response.status).toBe(400);
        expect(response.body.data[0].message).toContain('Password must contain');
      }
    });

    test('should reject duplicate email', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePass123!',
        });

      // Second registration with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePass123!',
        });

      expect(response.status).toBe(409);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('already exists');
    });

    test('should enforce rate limiting', async () => {
      const requests = Array(6).fill(null).map((_, i) => ({
        email: `user${i}@example.com`,
        password: 'SecurePass123!',
      }));

      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .post('/api/auth/register')
          .send(requests[i]);

        expect(response.status).toBe(201);
      }

      // 6th request should be rate limited
      const rateLimitedResponse = await request(app)
        .post('/api/auth/register')
        .send(requests[5]);

      expect(rateLimitedResponse.status).toBe(429);
      expect(rateLimitedResponse.body.status).toBe('error');
      expect(rateLimitedResponse.body.message).toContain('Too many registration attempts');
    });

    test('should accept optional fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'optional@example.com',
          password: 'SecurePass123!',
        });

      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe('optional@example.com');
      expect(response.body.data.firstName).toBeUndefined();
      expect(response.body.data.lastName).toBeUndefined();
    });

    test('should include correlation ID in response headers', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'correlation@example.com',
          password: 'SecurePass123!',
        });

      expect(response.headers['x-correlation-id']).toBeDefined();
    });

    test('should not expose password in response', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'nopassword@example.com',
          password: 'SecurePass123!',
        });

      expect(response.status).toBe(201);
      expect(response.body.data).not.toHaveProperty('password');
      expect(response.body.data).not.toHaveProperty('passwordHash');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.timestamp).toBeDefined();
    });
  });
});

yaml
# swagger.yaml
openapi: 3.0.0
info:
  title: Registration API
  description: User registration API with enterprise-grade security and validation
  version: 1.0.0
  contact:
    name: API Support

servers:
  - url: https://api.example.com
    description: Production server
  - url: http://localhost:3001
    description: Development server

paths:
  /api/auth/register:
    post:
      summary: Register a new user
      description: Create a new user account with email, password, and optional profile information
      operationId: registerUser
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegistrationRequest'
            examples:
              minimal:
                summary: Minimal registration
                value:
                  email: user@example.com
                  password: SecurePass123!
              complete:
                summary: Complete registration with profile info
                value:
                  email: user@example.com
                  password: SecurePass123!
                  firstName: John
                  lastName: Doe
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'
              examples:
                success:
                  value:
                    status: success
                    message: User registered successfully
                    data:
                      userId: 550e8400-e29b-41d4-a716-446655440000
                      email: user@example.com
                      firstName: John
                      lastName: Doe
                      createdAt: '2024-01-15T10:30:00Z'
        '400':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                missingField:
                  value:
                    status: error
                    message: Validation failed
                    data:
                      - field: email
                        message: Email is required
                invalidEmail:
                  value:
                    status: error
                    message: Validation failed
                    data:
                      - field: email
                        message: Invalid email format. Please provide a valid email address.
                weakPassword:
                  value: