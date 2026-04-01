import { Request, Response } from 'express';
import { GetFeedbackByIdUseCase } from '@application/useCases/feedback/GetFeedbackByIdUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';

export class GetFeedbackByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user?.id;

    const feedbackRepository = RepositoryFactory.getFeedbackRepository();
    const voteRepository = RepositoryFactory.getVoteRepository();

    const useCase = new GetFeedbackByIdUseCase(
      feedbackRepository,
      voteRepository,
    );

    const feedback = await useCase.execute({ id, userId });

    return res.status(200).json({
      status: 'success',
      data: { feedback },
    });
  }
}
