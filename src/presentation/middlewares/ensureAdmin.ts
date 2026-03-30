import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'ADMIN') {
    throw new AppError('Access denied: Administrator rights required', 403);
  }

  next();
}
