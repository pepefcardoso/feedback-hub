import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateCommentUseCase } from '@application/useCases/comment/CreateCommentUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';
import { AppError } from '@shared/errors/AppError';

const createCommentSchema = z.object({
  content: z
    .string()
    .min(3, 'Content must be at least 3 characters')
    .max(500, 'Content cannot exceed 500 characters')
    .trim(),
});

export class CreateCommentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: feedbackId } = req.params;
    const { content } = createCommentSchema.parse(req.body);

    const authorId = req.user?.id;
    if (!authorId) {
      throw new AppError('User not authenticated', 401);
    }

    const commentRepository = RepositoryFactory.getCommentRepository();
    const feedbackRepository = RepositoryFactory.getFeedbackRepository();

    const useCase = new CreateCommentUseCase(
      commentRepository,
      feedbackRepository,
    );

    const comment = await useCase.execute({
      content,
      authorId,
      feedbackId,
    });

    return res.status(201).json({
      status: 'success',
      data: { comment },
    });
  }
}
