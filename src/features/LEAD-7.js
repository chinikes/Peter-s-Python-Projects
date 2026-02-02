typescript
// ============================================================================
// shared/validation/constants.ts
// ============================================================================

export const VALIDATION_CONFIG = {
  PASSWORD: {
    MIN_LENGTH: parseInt(process.env.PASSWORD_MIN_LENGTH || '8', 10),
    REQUIRE_UPPERCASE: process.env.PASSWORD_REQUIRE_UPPERCASE !== 'false',
    REQUIRE_LOWERCASE: process.env.PASSWORD_REQUIRE_LOWERCASE !== 'false',
    REQUIRE_NUMBERS: process.env.PASSWORD_REQUIRE_NUMBERS !== 'false',
    REQUIRE_SPECIAL_CHARS: process.env.PASSWORD_REQUIRE_SPECIAL_CHARS !== 'false',
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  },
  EMAIL: {
    RFC5322_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 254,
  },
  RATE_LIMIT: {
    EMAIL_CHECK_PER_MINUTE: 10,
    FAILED_AUTH_ATTEMPTS: 5,
  },
};

export const VALIDATION_ERROR_CODES = {
  REQUIRED: 'REQUIRED',
  INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT',
  PASSWORD_MISSING_UPPERCASE: 'PASSWORD_MISSING_UPPERCASE',
  PASSWORD_MISSING_LOWERCASE: 'PASSWORD_MISSING_LOWERCASE',
  PASSWORD_MISSING_NUMBERS: 'PASSWORD_MISSING_NUMBERS',
  PASSWORD_MISSING_SPECIAL_CHARS: 'PASSWORD_MISSING_SPECIAL_CHARS',
  PASSWORD_WEAK_PATTERN: 'PASSWORD_WEAK_PATTERN',
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL_FORMAT: 'Please enter a valid email address',
  EMAIL_ALREADY_EXISTS: 'This email is already registered',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_CONFIG.PASSWORD.MIN_LENGTH} characters long`,
  PASSWORD_MISSING_UPPERCASE: 'Password must contain at least one uppercase letter (A-Z)',
  PASSWORD_MISSING_LOWERCASE: 'Password must contain at least one lowercase letter (a-z)',
  PASSWORD_MISSING_NUMBERS: 'Password must contain at least one numeric digit (0-9)',
  PASSWORD_MISSING_SPECIAL_CHARS: `Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)`,
  PASSWORD_WEAK_PATTERN: 'Password contains common weak patterns',
};

// ============================================================================
// shared/validation/validators.ts
// ============================================================================

import { VALIDATION_CONFIG, VALIDATION_ERROR_CODES, ERROR_MESSAGES } from './constants';

export interface ValidationError {
  code: string;
  message: string;
  field?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface PasswordValidationResult extends ValidationResult {
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
  };
  strength: 'weak' | 'fair' | 'good' | 'strong';
}

/**
 * Validates required field
 */
export function validateRequired(value: string): ValidationError | null {
  if (!value || value.trim().length === 0) {
    return {
      code: VALIDATION_ERROR_CODES.REQUIRED,
      message: ERROR_MESSAGES.REQUIRED,
    };
  }
  return null;
}

/**
 * Validates email format using RFC 5322
 */
export function validateEmailFormat(email: string): ValidationError | null {
  if (!email) return null;

  if (email.length > VALIDATION_CONFIG.EMAIL.MAX_LENGTH) {
    return {
      code: VALIDATION_ERROR_CODES.INVALID_EMAIL_FORMAT,
      message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT,
    };
  }

  // RFC 5322 compliant regex
  const rfc5322Regex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

  if (!rfc5322Regex.test(email.toLowerCase())) {
    return {
      code: VALIDATION_ERROR_CODES.INVALID_EMAIL_FORMAT,
      message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT,
    };
  }

  return null;
}

/**
 * Validates password strength and compliance
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: ValidationError[] = [];
  const requirements = {
    minLength: password.length >= VALIDATION_CONFIG.PASSWORD.MIN_LENGTH,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecialChars: new RegExp(
      `[${VALIDATION_CONFIG.PASSWORD.SPECIAL_CHARS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`
    ).test(password),
  };

  if (VALIDATION_CONFIG.PASSWORD.REQUIRE_UPPERCASE && !requirements.hasUppercase) {
    errors.push({
      code: VALIDATION_ERROR_CODES.PASSWORD_MISSING_UPPERCASE,
      message: ERROR_MESSAGES.PASSWORD_MISSING_UPPERCASE,
    });
  }

  if (VALIDATION_CONFIG.PASSWORD.REQUIRE_LOWERCASE && !requirements.hasLowercase) {
    errors.push({
      code: VALIDATION_ERROR_CODES.PASSWORD_MISSING_LOWERCASE,
      message: ERROR_MESSAGES.PASSWORD_MISSING_LOWERCASE,
    });
  }

  if (VALIDATION_CONFIG.PASSWORD.REQUIRE_NUMBERS && !requirements.hasNumbers) {
    errors.push({
      code: VALIDATION_ERROR_CODES.PASSWORD_MISSING_NUMBERS,
      message: ERROR_MESSAGES.PASSWORD_MISSING_NUMBERS,
    });
  }

  if (VALIDATION_CONFIG.PASSWORD.REQUIRE_SPECIAL_CHARS && !requirements.hasSpecialChars) {
    errors.push({
      code: VALIDATION_ERROR_CODES.PASSWORD_MISSING_SPECIAL_CHARS,
      message: ERROR_MESSAGES.PASSWORD_MISSING_SPECIAL_CHARS,
    });
  }

  if (!requirements.minLength) {
    errors.push({
      code: VALIDATION_ERROR_CODES.PASSWORD_TOO_SHORT,
      message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
    });
  }

  if (hasWeakPattern(password)) {
    errors.push({
      code: VALIDATION_ERROR_CODES.PASSWORD_WEAK_PATTERN,
      message: ERROR_MESSAGES.PASSWORD_WEAK_PATTERN,
    });
  }

  const strength = calculatePasswordStrength(password, requirements);

  return {
    isValid: errors.length === 0,
    errors,
    requirements,
    strength,
  };
}

/**
 * Detects common weak password patterns
 */
function hasWeakPattern(password: string): boolean {
  const weakPatterns = [
    /^[0-9]+$/, // only numbers
    /^[a-zA-Z]+$/, // only letters
    /^(012|123|234|345|456|567|678|789|890|qwerty|asdfgh|zxcvbn)/, // sequential patterns
    /(.)\1{2,}/, // repeated characters 3+ times
  ];

  return weakPatterns.some((pattern) => pattern.test(password));
}

/**
 * Calculates password strength score
 */
function calculatePasswordStrength(
  password: string,
  requirements: Record<string, boolean>
): 'weak' | 'fair' | 'good' | 'strong' {
  let score = 0;

  // Length scoring
  if (password.length >= VALIDATION_CONFIG.PASSWORD.MIN_LENGTH) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character diversity scoring
  const diversityCount = Object.values(requirements).filter(Boolean).length;
  score += diversityCount;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'fair';
  if (score <= 6) return 'good';
  return 'strong';
}

/**
 * Validates registration form
 */
export function validateRegistrationForm(data: {
  email: string;
  password: string;
  confirmPassword?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Email validation
  const requiredError = validateRequired(data.email);
  if (requiredError) {
    errors.push({ ...requiredError, field: 'email' });
  } else {
    const emailFormatError = validateEmailFormat(data.email);
    if (emailFormatError) {
      errors.push({ ...emailFormatError, field: 'email' });
    }
  }

  // Password validation
  const requiredPasswordError = validateRequired(data.password);
  if (requiredPasswordError) {
    errors.push({ ...requiredPasswordError, field: 'password' });
  } else {
    const passwordResult = validatePassword(data.password);
    errors.push(
      ...passwordResult.errors.map((err) => ({
        ...err,
        field: 'password',
      }))
    );
  }

  // Confirm password validation
  if (data.confirmPassword !== undefined) {
    const requiredConfirmError = validateRequired(data.confirmPassword);
    if (requiredConfirmError) {
      errors.push({ ...requiredConfirmError, field: 'confirmPassword' });
    } else if (data.password !== data.confirmPassword) {
      errors.push({
        code: 'PASSWORD_MISMATCH',
        message: 'Passwords do not match',
        field: 'confirmPassword',
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// shared/validation/debounce.ts
// ============================================================================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================================================
// backend/middleware/validationErrorHandler.ts
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

export class ValidationException extends Error {
  constructor(
    public errors: Array<{
      code: string;
      message: string;
      field?: string;
    }>
  ) {
    super('Validation failed');
    this.name = 'ValidationException';
  }
}

export function validationErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationException) {
    Logger.warn('Validation failed', {
      timestamp: new Date().toISOString(),
      eventType: 'validation_failure',
      sourceIp: req.ip,
      userId: (req as any).userId,
      path: req.path,
      errors: err.errors,
    });

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: err.errors,
      timestamp: new Date().toISOString(),
    });
  }

  next(err);
}

// ============================================================================
// backend/utils/logger.ts
// ============================================================================

export class Logger {
  static warn(message: string, context: Record<string, any>) {
    const logEntry = {
      level: 'WARN',
      timestamp: new Date().toISOString(),
      message,
      ...context,
    };
    console.warn(JSON.stringify(logEntry));
  }

  static error(message: string, context: Record<string, any>) {
    const logEntry = {
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      message,
      ...context,
    };
    console.error(JSON.stringify(logEntry));
  }

  static info(message: string, context?: Record<string, any>) {
    const logEntry = {
      level: 'INFO',
      timestamp: new Date().toISOString(),
      message,
      ...(context && context),
    };
    console.info(JSON.stringify(logEntry));
  }
}

// ============================================================================
// backend/utils/rateLimiter.ts
// ============================================================================

import { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();

export function rateLimitMiddleware(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.ip}:${req.path}`;
    const now = Date.now();

    let entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + windowMs,
      };
      rateLimitStore.set(key, entry);
    }

    entry.count++;

    if (entry.count > maxRequests) {
      Logger.warn('Rate limit exceeded', {
        timestamp: new Date().toISOString(),
        eventType: 'rate_limit_exceeded',
        sourceIp: req.ip,
        path: req.path,
      });

      return res.status(429).json({
        success: false,
        error: 'Too many requests',
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      });
    }

    next();
  };
}

// ============================================================================
// backend/services/userService.ts
// ============================================================================

export interface IUserRepository {
  findByEmail(email: string): Promise<any | null>;
  create(userData: { email: string; password: string }): Promise<any>;
}

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async registerUser(data: { email: string; password: string }) {
    const { validateRegistrationForm } = await import(
      '../../shared/validation/validators'
    );

    const validationResult = validateRegistrationForm(data);

    if (!validationResult.isValid) {
      throw new ValidationException(validationResult.errors);
    }

    // Check email uniqueness
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ValidationException([
        {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'This email is already registered',
          field: 'email',
        },
      ]);
    }

    const user = await this.userRepository.create({
      email: data.email,
      password: data.password,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }
}

// ============================================================================
// backend/routes/auth.ts
// ============================================================================

import express, { Request, Response } from 'express';
import { rateLimitMiddleware } from '../utils/rateLimiter';
import { ValidationException } from '../middleware/validationErrorHandler';

const router = express.Router();

// Rate limiting for registration
const registrationRateLimit = rateLimitMiddleware(10, 60000); // 10 requests per minute

router.post('/register', registrationRateLimit, async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validate input structure
    if (!email || !password) {
      throw new ValidationException([
        {
          code: 'REQUIRED',
          message: 'Email and password are required',
        },
      ]);
    }

    // Import and use service
    const userService = (req.app as any).userService;

    if (password !== confirmPassword) {
      throw new ValidationException([
        {
          code: 'PASSWORD_MISMATCH',
          message: 'Passwords do not match',
          field: 'confirmPassword',
        },
      ]);
    }

    const user = await userService.registerUser({ email, password });

    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof ValidationException) {
      throw error;
    }
    throw error;
  }
});

// Email uniqueness validation endpoint
const emailCheckRateLimit = rateLimitMiddleware(
  15,
  60000
); // 15 requests per minute

router.post(
  '/validate-email',
  emailCheckRateLimit,
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const { validateRequired, validateEmailFormat } = await import(
        '../../shared/validation/validators'
      );

      const requiredError = validateRequired(email);
      if (requiredError) {
        return res.status(400).json({
          success: false,
          valid: false,
          error: requiredError.message,
        });
      }

      const formatError = validateEmailFormat(email);
      if (formatError) {
        return res.status(400).json({
          success: false,
          valid: false,
          error: formatError.message,
        });
      }

      // Check email uniqueness
      const userService = (req.app as any).userService;
      const userRepository = (req.app as any).userRepository;

      const existingUser = await userRepository.findByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          success: false,
          valid: false,
          error: 'This email is already registered',
          code: 'EMAIL_ALREADY_EXISTS',
        });
      }

      res.json({
        success: true,
        valid: true,
      });
    } catch (error) {
      Logger.error('Email validation error', {
        timestamp: new Date().toISOString(),
        sourceIp: req.ip,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
);

export default router;

// ============================================================================
// frontend/components/FormInput.tsx
// ============================================================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { debounce } from '../../shared/validation/debounce';
import { validateEmailFormat, validatePassword } from '../../shared/validation/validators';

interface FormInputProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  errors?: Array<{ code: string; message: string }>;
  disabled?: boolean;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  showPasswordStrength?: boolean;
  onEmailValidation?: (isValid: boolean) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  type = 'text',
  label,
  placeholder,
  required = false,
  value,
  onChange,
  onBlur,
  errors = [],
  disabled = false,
  minLength,
  pattern,
  autoComplete,
  showPasswordStrength = false,
  onEmailValidation,
}) => {
  const [touched, setTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'fair' | 'good' | 'strong' | null
  >(null);
  const [passwordRequirements, setPasswordRequirements] = useState<
    Record<string, boolean> | null
  >(null);
  const validateEmailRef = useRef<(email: string) => void>();

  // Debounced email validation
  useEffect(() => {
    if (type === 'email' && onEmailValidation) {
      validateEmailRef.current = debounce(async (email: string) => {
        if (!email || validateEmailFormat(email)) {
          return;
        }

        setIsValidating(true);
        try {
          const response = await fetch('/api/auth/validate-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });

          const result = await response.json();
          onEmailValidation(result.valid !== false && response.ok);
        } catch (error) {
          console.error('Email validation error:', error);
          // Don't prevent form submission on network error
        } finally {
          setIsValidating(false);
        }
      }, 500);
    }
  }, [type, onEmailValidation]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      // Trigger email validation if applicable
      if (type === 'email' && validateEmailRef.current) {
        validateEmailRef.current(newValue);
      }

      // Update password strength if applicable
      if (showPasswordStrength && type === 'password') {
        const { strength, requirements } = validatePassword(newValue);
        setPasswordStrength(strength);
        setPasswordRequirements(requirements);
      }
    },
    [onChange, type, showPasswordStrength]
  );

  const handleBlur = useCallback(() => {
    setTouched(true);
    onBlur?.();
  }, [onBlur]);

  const isInvalid = touched && errors.length > 0;
  const isValid = touched && errors.length === 0 && !isValidating;

  return (
    <div className="form-group" role="group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-indicator" aria-label="required">*</span>}
      </label>

      <div className="input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${name}-errors` : undefined}
          className={`form-input ${isInvalid ? 'invalid' : ''} ${
            isValid ? 'valid' : ''
          } ${isValidating ? 'validating' : ''}`}
        />

        {isValidating && (
          <span className="validating-indicator" aria-label="validating">
            ⟳
          </span>
        )}
      </div>

      {/* Error messages */}
      {isInvalid && (
        <div id={`${name}-errors`} className="error-messages" role="alert">
          {errors.map((error) => (
            <div key={error.code} className="error-message">
              {error.message}
            </div>
          ))}
        </div>
      )}

      {/* Password strength indicator */}
      {showPasswordStrength && passwordStrength && (
        <div className="password-strength-container">
          <div className={`strength-meter strength-${passwordStrength}`}>
            <div className="strength-bar" />
          </div>

          <div className="strength-text">
            Strength: <span className={`strength-${passwordStrength}`}>{passwordStrength}</span>
          </div>

          {passwordRequirements && (
            <div className="password-requirements">
              <div
                className={`requirement ${
                  passwordRequirements.minLength ? 'met' : 'unmet'
                }`}
              >
                <span className="requirement-icon">
                  {passwordRequirements.minLength ? '✓' : '✗'}
                </span>
                At least 8 characters
              </div>

              <div
                className={`requirement ${
                  passwordRequirements.hasUppercase ? 'met' : 'unmet'
                }`}
              >
                <span className="requirement-icon">
                  {passwordRequirements.hasUppercase ? '✓' : '✗'}
                </span>
                One uppercase letter (A-Z)
              </div>

              <div
                className={`requirement ${
                  passwordRequirements.hasLowercase ? 'met' : 'unmet'
                }`}
              >
                <span className="requirement-icon">
                  {passwordRequirements.hasLowercase ? '✓' : '✗'}
                </span>
                One lowercase letter (a-z)
              </div>

              <div
                className={`requirement ${
                  passwordRequirements.hasNumbers ? 'met' : 'unmet'
                }`}
              >
                <span className="requirement-icon">
                  {passwordRequirements.hasNumbers ? '✓' : '✗'}
                </span>
                One numeric digit (0-9)
              </div>

              <div
                className={`requirement ${
                  passwordRequirements.hasSpecialChars ? 'met' : 'unmet'
                }`}
              >
                <span className="requirement-icon">
                  {passwordRequirements.hasSpecialChars ? '✓' : '✗'}
                </span>
                One special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// frontend/components/RegistrationForm.tsx
// ============================================================================

import React, { useState, useCallback } from 'react';
import { FormInput } from './FormInput';
import { validateRegistrationForm } from '../../shared/validation/validators';

interface FormErrors {
  [key: string]: Array<{ code: string; message: string }>;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [touched, setTouched] = useState<Partial<FormData>>({});

  const validateForm = useCallback((): boolean => {
    const validationResult = validateRegistrationForm(formData);

    const errorsByField: FormErrors = {};
    validationResult.errors.forEach((error) => {
      const field = error.field || 'general';
      if (!errorsByField[field]) {
        errorsByField[field] = [];
      }
      errorsByField[field].push({
        code: error.code,
        message: error.message,
      });
    });

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      if (!errorsByField.confirmPassword) {
        errorsByField.confirmPassword = [];
      }
      errorsByField.confirmPassword.push({
        code: 'PASSWORD_MISMATCH',
        message: 'Passwords do not match',
      });
    }

    setErrors(errorsByField);
    return validationResult.isValid && formData.password === formData.confirmPassword;
  }, [formData]);

  const handleFieldChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Clear field-specific errors
    setErrors((prev) => ({
      ...prev,
      [field]: [],
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);

      // Validate form
      if (!validateForm()) {
        return;
      }

      // Ensure email uniqueness check passed
      if (!emailIsValid) {
        setErrors((prev) => ({
          ...prev,
          email: [
            {
              code: 'EMAIL_ALREADY_EXISTS',
              message: 'This email is already registered',
            },
          ],
        }));
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({