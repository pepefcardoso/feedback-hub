import { Request, Response } from 'express';
import { z } from 'zod';
import { RegisterUserUseCase } from '@application/useCases/user/RegisterUserUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';
import { BcryptPasswordHasher } from '@infrastructure/security/BcryptPasswordHasher';

const registerUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export class RegisterUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const parsedData = registerUserSchema.parse(req.body);

    const userRepository = RepositoryFactory.getUserRepository();
    const passwordHasher = new BcryptPasswordHasher();
    const useCase = new RegisterUserUseCase(userRepository, passwordHasher);

    const user = await useCase.execute(parsedData);

    return res.status(201).json({
      status: 'success',
      data: { user },
    });
  }
}
