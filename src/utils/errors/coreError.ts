/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable max-classes-per-file */
import { ErrorType } from '../interfaces';
/**
 * Base core error class
 * @class BaseCoreError
 * @extends {Error}
 */
export class BaseCoreError extends Error {
  public name: string;
  public message: string;
  public cause?: Error;
  public metadata?: Object;

  constructor(err: ErrorType) {
    super(err.message);
    this.name = err.name;
    this.message = err.message;
    this.cause = err.cause;
    this.metadata = err.metadata;
  }
}

/**
 * Authentication error class
 * @class AuthError
 * @extends {BaseCoreError}
 */
export class AuthError extends BaseCoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Unauthorized error class
 * @class UnauthorizedError
 * @extends {BaseCoreError}
 */
export class UnauthorizedError extends BaseCoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Not found error class
 * @class NotFoundError
 * @extends {BaseCoreError}
 */
export class NotFoundError extends BaseCoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Database unique constraint error class
 * @class DatabaseUniqueConstraintError
 * @extends {BaseCoreError}
 */
export class DatabaseUniqueConstraintError extends BaseCoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Database validation error class
 * @class DatabaseValidationError
 * @extends {BaseCoreError}
 */
export class DatabaseValidationError extends BaseCoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Bad parameters error class
 * @class BadParametersError
 * @extends {BaseCoreError}
 */
export class BadParametersError extends BaseCoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Create an error instance
 * @param {ErrorType} err - Options of error like name, message, cause and metadata.
 * @returns {BaseCoreError} Resolve with an error instance.
 */
export default function error(err: ErrorType): BaseCoreError {
  switch (err.cause!.constructor) {
    case BadParametersError:
      return new BadParametersError(err);
    case NotFoundError:
      return new NotFoundError(err);
    case UnauthorizedError:
      return new UnauthorizedError(err);
    case AuthError:
      return new AuthError(err);
    default:
      return new BaseCoreError(err);
  }
}
