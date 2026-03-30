import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateFeedbackUseCase } from '@application/useCases/feedback/CreateFeedbackUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';
import { AppError } from '@shared/errors/AppError';

const createFeedbackSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .trim(),
  category: z.string().min(1, 'Category is required').trim(),
});

export class CreateFeedbackController {
  async handle(req: Request, res: Response): Promise<Response> {
    const parsedData = createFeedbackSchema.parse(req.body);

    const authorId = req.user?.id;
    if (!authorId) {
      throw new AppError('User not authenticated', 401);
    }

    const feedbackRepository = RepositoryFactory.getFeedbackRepository();
    const useCase = new CreateFeedbackUseCase(feedbackRepository);

    const feedback = await useCase.execute({
      ...parsedData,
      authorId,
    });

    return res.status(201).json({
      status: 'success',
      data: { feedback },
    });
  }
}
