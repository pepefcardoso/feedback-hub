import { Request, Response } from 'express';
import { z } from 'zod';
import { LoginUserUseCase } from '@application/useCases/user/LoginUserUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';
import { BcryptPasswordHasher } from '@infrastructure/security/BcryptPasswordHasher';
import { JwtProvider } from '@infrastructure/security/JwtProvider';

const loginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export class LoginUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const parsedData = loginUserSchema.parse(req.body);

    const userRepository = RepositoryFactory.getUserRepository();
    const passwordHasher = new BcryptPasswordHasher();
    const jwtProvider = new JwtProvider();

    const useCase = new LoginUserUseCase(
      userRepository,
      passwordHasher,
      jwtProvider,
    );

    const { user, token } = await useCase.execute(parsedData);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  }
}
