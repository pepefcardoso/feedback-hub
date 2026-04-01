import { Request, Response, NextFunction } from 'express';
import { JwtProvider } from '@infrastructure/security/JwtProvider';

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return next();
  }

  try {
    const jwtProvider = new JwtProvider();
    const decoded = jwtProvider.verify(token);

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Invalid token:', error);
  }

  next();
}
