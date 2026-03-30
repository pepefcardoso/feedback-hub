import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import { JwtProvider } from '@infrastructure/security/JwtProvider';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;

  if (!token) {
    throw new AppError('Authentication token is missing', 401);
  }

  try {
    const jwtProvider = new JwtProvider();
    const decoded = jwtProvider.verify(token);

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }
}
