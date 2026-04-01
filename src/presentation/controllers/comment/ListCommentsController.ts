import { Request, Response } from 'express';
import { ListCommentsUseCase } from '@application/useCases/comment/ListCommentsUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';

export class ListCommentsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: feedbackId } = req.params;

    const commentRepository = RepositoryFactory.getCommentRepository();
    const feedbackRepository = RepositoryFactory.getFeedbackRepository();

    const useCase = new ListCommentsUseCase(
      commentRepository,
      feedbackRepository,
    );

    const comments = await useCase.execute({ feedbackId });

    return res.status(200).json({
      status: 'success',
      data: { comments },
    });
  }
}
