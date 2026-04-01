import { Request, Response } from 'express';

export class LogoutUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const isProduction = process.env.NODE_ENV === 'production';

    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'strict',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });

    return res.status(204).send();
  }
}
