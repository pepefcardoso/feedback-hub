import jwt, { SignOptions } from 'jsonwebtoken';
import { IJWTProvider } from '@application/ports/IJWTProvider';

export class JwtProvider implements IJWTProvider {
  private readonly secret: string;
  private readonly defaultExpiresIn: string;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('FATAL: JWT_SECRET is not defined in the environment.');
    }

    this.secret = secret;
    this.defaultExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
  }

  sign(payload: object, expiresIn?: string): string {
    const options: SignOptions = {
      expiresIn: (expiresIn || this.defaultExpiresIn) as unknown as SignOptions['expiresIn'],
    };

    return jwt.sign({ ...payload }, this.secret, options);
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
