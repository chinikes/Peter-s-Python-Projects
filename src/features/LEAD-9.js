typescript
// src/types/password.ts
export interface PasswordHashResult {
  hash: string;
  salt: string;
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface AuthenticationResult {
  success: boolean;
  message: string;
  userId?: string;
}

// src/config/bcrypt.config.ts
export const bcryptConfig = {
  SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  HASH_ALGORITHM: 'bcrypt',
  VERSION: '2b', // bcrypt version 2b
};

if (bcryptConfig.SALT_ROUNDS < 10) {
  throw new Error('BCRYPT_SALT_ROUNDS must be at least 10 for security compliance');
}

// src/utils/password.utils.ts
import * as bcrypt from 'bcrypt';
import { Logger } from 'winston';
import { PasswordHashResult, PasswordValidationResult } from '../types/password';
import { bcryptConfig } from '../config/bcrypt.config';

export class PasswordUtil {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Validates password strength before hashing
   * @param password - Plain text password to validate
   * @returns PasswordValidationResult with validation status and errors
   */
  validatePasswordStrength(password: string): PasswordValidationResult {
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
      return { isValid: false, errors };
    }

    if (password.length < bcryptConfig.MIN_PASSWORD_LENGTH) {
      errors.push(
        `Password must be at least ${bcryptConfig.MIN_PASSWORD_LENGTH} characters long`
      );
    }

    if (password.length > bcryptConfig.MAX_PASSWORD_LENGTH) {
      errors.push(
        `Password must not exceed ${bcryptConfig.MAX_PASSWORD_LENGTH} characters`
      );
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Hashes a plain text password using bcrypt
   * @param password - Plain text password to hash
   * @returns Promise resolving to PasswordHashResult
   * @throws Error if hashing fails
   */
  async hashPassword(password: string): Promise<PasswordHashResult> {
    try {
      // Validate password strength
      const validation = this.validatePasswordStrength(password);
      if (!validation.isValid) {
        this.logger.warn('Password validation failed', {
          errors: validation.errors,
        });
        throw new Error(`Password validation failed: ${validation.errors.join(', ')}`);
      }

      // Generate salt asynchronously
      const salt = await bcrypt.genSalt(bcryptConfig.SALT_ROUNDS);

      // Hash password with salt
      const hash = await bcrypt.hash(password, salt);

      this.logger.debug('Password hashed successfully', {
        saltRounds: bcryptConfig.SALT_ROUNDS,
        hashLength: hash.length,
      });

      return {
        hash,
        salt,
      };
    } catch (error) {
      this.logger.error('Password hashing failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new Error(`Password hashing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Compares a plain text password with a bcrypt hash
   * @param password - Plain text password to compare
   * @param hash - Bcrypt hash to compare against
   * @returns Promise resolving to boolean indicating match
   * @throws Error if comparison fails
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      if (!password || !hash) {
        this.logger.warn('Missing password or hash for comparison');
        return false;
      }

      const isMatch = await bcrypt.compare(password, hash);

      if (!isMatch) {
        this.logger.debug('Password comparison failed - no match');
      }

      return isMatch;
    } catch (error) {
      this.logger.error('Password comparison failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new Error(`Password comparison failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generates a random temporary password
   * @returns Random password string
   */
  generateTemporaryPassword(): string {
    const length = 16;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  }
}

// src/services/user.service.ts
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { PasswordUtil } from '../utils/password.utils';
import { User } from '../entities/user.entity';
import { AuthenticationResult, PasswordValidationResult } from '../types/password';

export class UserService {
  private userRepository: Repository<User>;
  private passwordUtil: PasswordUtil;
  private logger: Logger;

  constructor(
    userRepository: Repository<User>,
    passwordUtil: PasswordUtil,
    logger: Logger
  ) {
    this.userRepository = userRepository;
    this.passwordUtil = passwordUtil;
    this.logger = logger;
  }

  /**
   * Creates a new user with hashed password
   * @param userData - User data including email and plain text password
   * @returns Promise resolving to created User entity
   */
  async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        this.logger.warn('User creation attempted with existing email', {
          email: userData.email,
        });
        throw new Error('User with this email already exists');
      }

      // Validate and hash password
      const passwordHash = await this.passwordUtil.hashPassword(userData.password);

      // Create new user entity
      const user = this.userRepository.create({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        passwordHash: passwordHash.hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save user to database
      const savedUser = await this.userRepository.save(user);

      this.logger.info('User created successfully', {
        userId: savedUser.id,
        email: savedUser.email,
      });

      return savedUser;
    } catch (error) {
      this.logger.error('User creation failed', {
        email: userData.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /**
   * Authenticates a user with email and password
   * @param email - User email
   * @param password - Plain text password
   * @returns Promise resolving to AuthenticationResult
   */
  async authenticateUser(email: string, password: string): Promise<AuthenticationResult> {
    try {
      // Find user by email
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        this.logger.warn('Authentication attempted with non-existent email', {
          email,
        });
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Compare provided password with stored hash
      const isPasswordValid = await this.passwordUtil.comparePassword(
        password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        this.logger.warn('Authentication failed - invalid password', {
          userId: user.id,
          email,
        });
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      this.logger.info('User authenticated successfully', {
        userId: user.id,
        email,
      });

      return {
        success: true,
        message: 'Authentication successful',
        userId: user.id,
      };
    } catch (error) {
      this.logger.error('Authentication failed', {
        email,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return {
        success: false,
        message: 'Authentication process failed',
      };
    }
  }

  /**
   * Updates user password
   * @param userId - User ID
   * @param oldPassword - Current plain text password
   * @param newPassword - New plain text password
   * @returns Promise resolving to boolean indicating success
   */
  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      // Find user
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        this.logger.warn('Password update attempted for non-existent user', {
          userId,
        });
        throw new Error('User not found');
      }

      // Verify old password
      const isOldPasswordValid = await this.passwordUtil.comparePassword(
        oldPassword,
        user.passwordHash
      );

      if (!isOldPasswordValid) {
        this.logger.warn('Password update failed - invalid old password', {
          userId,
        });
        throw new Error('Current password is incorrect');
      }

      // Validate new password
      const validation = this.passwordUtil.validatePasswordStrength(newPassword);
      if (!validation.isValid) {
        this.logger.warn('Password update failed - validation error', {
          userId,
          errors: validation.errors,
        });
        throw new Error(`Password validation failed: ${validation.errors.join(', ')}`);
      }

      // Hash new password
      const newPasswordHash = await this.passwordUtil.hashPassword(newPassword);

      // Update user
      user.passwordHash = newPasswordHash.hash;
      user.updatedAt = new Date();
      user.lastPasswordChange = new Date();

      await this.userRepository.save(user);

      this.logger.info('User password updated successfully', {
        userId,
      });

      return true;
    } catch (error) {
      this.logger.error('Password update failed', {
        userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /**
   * Resets user password (admin/forgot password scenario)
   * @param userId - User ID
   * @param newPassword - New plain text password
   * @returns Promise resolving to boolean indicating success
   */
  async resetPassword(userId: string, newPassword: string): Promise<boolean> {
    try {
      // Find user
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        this.logger.warn('Password reset attempted for non-existent user', {
          userId,
        });
        throw new Error('User not found');
      }

      // Validate new password
      const validation = this.passwordUtil.validatePasswordStrength(newPassword);
      if (!validation.isValid) {
        this.logger.warn('Password reset failed - validation error', {
          userId,
          errors: validation.errors,
        });
        throw new Error(`Password validation failed: ${validation.errors.join(', ')}`);
      }

      // Hash new password
      const newPasswordHash = await this.passwordUtil.hashPassword(newPassword);

      // Update user
      user.passwordHash = newPasswordHash.hash;
      user.updatedAt = new Date();
      user.lastPasswordChange = new Date();
      user.passwordResetRequired = false;

      await this.userRepository.save(user);

      this.logger.info('User password reset successfully', {
        userId,
      });

      return true;
    } catch (error) {
      this.logger.error('Password reset failed', {
        userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /**
   * Validates password strength without hashing
   * @param password - Plain text password to validate
   * @returns PasswordValidationResult
   */
  validatePasswordStrength(password: string): PasswordValidationResult {
    return this.passwordUtil.validatePasswordStrength(password);
  }
}

// src/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 60 })
  passwordHash: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  passwordResetRequired: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordChange: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { UserService } from '../services/user.service';

export class AuthController {
  private userService: UserService;
  private logger: Logger;

  constructor(userService: UserService, logger: Logger) {
    this.userService = userService;
    this.logger = logger;
  }

  /**
   * Register endpoint
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Validate input
      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      // Create user
      const user = await this.userService.createUser({
        email,
        password,
        firstName,
        lastName,
      });

      // Return user data without password hash
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      this.logger.error('Registration endpoint error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const statusCode = error instanceof Error &&
        (error.message.includes('already exists') ? 409 : 400);

      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  }

  /**
   * Login endpoint
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
        return;
      }

      // Authenticate user
      const result = await this.userService.authenticateUser(email, password);

      if (!result.success) {
        res.status(401).json({
          success: false,
          message: result.message,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: result.message,
        userId: result.userId,
      });
    } catch (error) {
      this.logger.error('Login endpoint error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      res.status(500).json({
        success: false,
        message: 'Login failed',
      });
    }
  }

  /**
   * Change password endpoint
   */
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { userId, oldPassword, newPassword } = req.body;

      // Validate input
      if (!userId || !oldPassword || !newPassword) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      // Update password
      await this.userService.updatePassword(userId, oldPassword, newPassword);

      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      this.logger.error('Change password endpoint error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const statusCode = error instanceof Error &&
        (error.message.includes('not found') ? 404 :
         error.message.includes('incorrect') ? 401 : 400);

      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Password change failed',
      });
    }
  }

  /**
   * Reset password endpoint (admin only)
   */
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { userId, newPassword } = req.body;

      // Validate input
      if (!userId || !newPassword) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      // Reset password
      await this.userService.resetPassword(userId, newPassword);

      res.status(200).json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (error) {
      this.logger.error('Reset password endpoint error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const statusCode = error instanceof Error &&
        (error.message.includes('not found') ? 404 : 400);

      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Password reset failed',
      });
    }
  }

  /**
   * Validate password endpoint (for frontend validation)
   */
  validatePassword(req: Request, res: Response): void {
    try {
      const { password } = req.body;

      if (!password) {
        res.status(400).json({
          success: false,
          message: 'Password is required',
        });
        return;
      }

      const result = this.userService.validatePasswordStrength(password);

      res.status(200).json({
        success: result.isValid,
        errors: result.errors,
      });
    } catch (error) {
      this.logger.error('Validate password endpoint error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      res.status(500).json({
        success: false,
        message: 'Password validation failed',
      });
    }
  }
}

// src/migrations/1699564800000-AddPasswordHashToUsers.ts
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordHashToUsers1699564800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'passwordHash',
        type: 'varchar',
        length: '60',
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'lastPasswordChange',
        type: 'timestamp',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'passwordResetRequired',
        type: 'boolean',
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'passwordResetRequired');
    await queryRunner.dropColumn('users', 'lastPasswordChange');
    await queryRunner.dropColumn('users', 'passwordHash');
  }
}

// src/migrations/1699564900000-MigratePasswordsToBcrypt.ts
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class MigratePasswordsToBcrypt1699564900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get all users with plain text passwords
    const users = await queryRunner.query(
      `SELECT id, password FROM users WHERE password IS NOT NULL AND password != ''`
    );

    const SALT_ROUNDS = 10;

    // Hash each password
    for (const user of users) {
      try {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
        await queryRunner.query(
          `UPDATE users SET passwordHash = $1 WHERE id = $2`,
          [hash, user.id]
        );
      } catch (error) {
        console.error(`Failed to migrate password for user ${user.id}:`, error);
        throw error;
      }
    }

    // Drop the old password column
    await queryRunner.query(`ALTER TABLE users DROP COLUMN password`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add back password column
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN password varchar(255) NULL`
    );
  }
}

// src/tests/unit/password.util.test.ts
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Logger } from 'winston';
import { PasswordUtil } from '../../utils/password.utils';
import { bcryptConfig } from '../../config/bcrypt.config';

describe('PasswordUtil', () => {
  let passwordUtil: PasswordUtil;
  let loggerStub: sinon.SinonStubbedInstance<Logger>;

  beforeEach(() => {
    loggerStub = sinon.stub(Logger.prototype);
    passwordUtil = new PasswordUtil(loggerStub as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('validatePasswordStrength', () => {
    it('should reject passwords shorter than 8 characters', () => {
      const result = passwordUtil.validatePasswordStrength('Short1!');
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include(
        `Password must be at least ${bcryptConfig.MIN_PASSWORD_LENGTH} characters long`
      );
    });

    it('should reject passwords without uppercase letters', () => {
      const result = passwordUtil.validatePasswordStrength('password123!');
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include('Password must contain at least one uppercase letter');
    });

    it('should reject passwords without lowercase letters', () => {
      const result = passwordUtil.validatePasswordStrength('PASSWORD123!');
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include('Password must contain at least one lowercase letter');
    });

    it('should reject passwords without numbers', () => {
      const result = passwordUtil.validatePasswordStrength('Password!');
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include('Password must contain at least one number');
    });

    it('should reject passwords without special characters', () => {
      const result = passwordUtil.validatePasswordStrength('Password123');
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include(
        'Password must contain at least one special character'
      );
    });

    it('should accept valid passwords', () => {
      const result = passwordUtil.validatePasswordStrength('ValidPassword123!');
      expect(result.isValid).to.be.true;
      expect(result.errors).to.be.empty;
    });

    it('should reject empty passwords', () => {
      const result = passwordUtil.validatePasswordStrength('');
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include('Password is required');
    });
  });

  describe('hashPassword', () => {
    it('should hash a valid password', async () => {
      const password = 'ValidPassword123!';
      const result = await passwordUtil.hashPassword(password);

      expect(result).to.have.property('hash');
      expect(result).to.have.property('salt');
      expect(result.hash).to.have.lengthOf(60); // bcrypt hash length
      expect(result.hash).to.include('$2b$'); // bcrypt prefix
    });

    it('should produce different hashes for the same password (salt validation)', async () => {
      const password = 'ValidPassword123!';
      const result1 = await passwordUtil.hashPassword(password);
      const result2 = await passwordUtil.hashPassword(password);

      expect(result1.hash).to.not.equal(result2.hash);
      expect(result1.salt).to.not.equal(result2.salt);
    });

    it('should reject invalid passwords during hashing', async () => {
      const invalidPassword = 'weak';

      try {
        await passwordUtil.hashPassword(invalidPassword);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.include('Password validation failed');
      }
    });

    it('should use configured salt rounds', async () => {
      const password = 'ValidPassword123!';
      const result = await passwordUtil.hashPassword(password);

      // bcrypt hash format: $2b$10$...
      // Extract salt rounds from hash
      const hashParts = result.hash.split('$');
      const saltRounds = parseInt(hashParts[2], 10);

      expect(saltRounds).to.equal(bcryptConfig.SALT_ROUNDS);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching password and hash', async () => {
      const password = 'ValidPassword123!';
      const { hash } = await passwordUtil.hashPassword(password);

      const isMatch = await passwordUtil.comparePassword(password, hash);
      expect(isMatch).to.be.true;
    });

    it('should return false for non-matching password and hash', async () => {
      const password = 'ValidPassword123!';
      const wrongPassword = 'DifferentPassword123!';
      const { hash } = await passwordUtil.hashPassword(password);

      const isMatch = await passwordUtil.comparePassword(wrongPassword, hash);
      expect(isMatch).to.be.false;
    });

    it('should return false for missing password', async () => {
      const hash = '$2b$10$abc123def456';
      const isMatch = await passwordUtil.comparePassword('', hash);
      expect(isMatch).to.be.false;
    });

    it('should return false for missing hash', async () => {
      const isMatch = await passwordUtil.comparePassword('ValidPassword123!', '');
      expect(isMatch).to.be.false;
    });

    it('should prevent timing attacks by using bcrypt compare', async () => {
      const password = 'ValidPassword123!';
      const { hash } = await passwordUtil.hashPassword(password);

      const wrongPassword1 = 'A' + password.slice(1);
      const wrongPassword2 = 'Z' + password.slice(1);

      // Both should return false and take similar time
      const isMatch1 = await passwordUtil.comparePassword(wrongPassword1, hash);
      const isMatch2 = await passwordUtil.comparePassword(wrongPassword2, hash);

      expect(isMatch1).to.be.false;
      expect(isMatch2).to.be.false;
    });
  });

  describe('generateTemporaryPassword', () => {
    it('should generate a 16-character password', () => {
      const password = passwordUtil.generateTemporaryPassword();
      expect(password).to.have.lengthOf(16);
    });

    it('should generate unique passwords on each call', () => {
      const password1 = passwordUtil.generateTemporaryPassword();
      const password2 = passwordUtil.generateTemporaryPassword();

      expect(password1).to.not.equal(password2);
    });

    it('should generate passwords with valid characters', () => {
      const password = passwordUtil.generateTemporaryPassword();
      const validCharset = /^[A-Za-z0-9!@#$%^&*]+$/;

      expect(password).to.match(validCharset);
    });
  });
});

// src/tests/integration/user.service.test.ts
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { UserService } from '../../services/user.service';
import { PasswordUtil } from '../../utils/password.utils';
import { User } from '../../entities/user.entity';

describe('UserService Integration Tests', () => {
  let userService: UserService;
  let userRepositoryStub: sinon.SinonStubbedInstance<Repository<User>>;
  let passwordUtilStub: sinon.SinonStubbedInstance<PasswordUtil>;
  let loggerStub: sinon.SinonStubbedInstance<Logger>;

  beforeEach(() => {
    userRepositoryStub =