import { Request, Response } from 'express';
import { GetMeUseCase } from '@application/useCases/user/GetMeUseCase';
import { PrismaUserRepository } from '@infrastructure/repositories/PrismaUserRepository';
import { AppError } from '@shared/errors/AppError';
import prisma from '@infrastructure/database/prisma';

export class GetMeController {
  async handle(req: Request, res: Response): Promise<Response> {
    if (!req.user || !req.user.id) {
      throw new AppError('Unauthorized', 401);
    }

    const userId = req.user.id;

    const userRepository = new PrismaUserRepository(prisma);
    const getMeUseCase = new GetMeUseCase(userRepository);

    const user = await getMeUseCase.execute(userId);

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  }
}
