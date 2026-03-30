import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.headers['x-mock-user-id'] as string;

  if (!userId) {
    throw new AppError('Authentication token is missing', 401);
  }

  req.user = {
    id: userId,
  };

  next();
}
