import { Request, Response } from 'express';

export class LogoutUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return res.status(204).send();
  }
}
