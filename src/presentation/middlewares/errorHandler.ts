import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../../shared/errors/AppError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'validation_error',
      errors: err.errors.map((e) => ({ path: e.path, message: e.message })),
    });
  }

  // eslint-disable-next-line no-console
  console.error('[Unhandled Exception]:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
