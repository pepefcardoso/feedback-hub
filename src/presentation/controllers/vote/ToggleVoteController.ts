import { Request, Response } from 'express';
import { z } from 'zod';
import { ToggleVoteUseCase } from '@application/useCases/vote/ToggleVoteUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';
import { AppError } from '@shared/errors/AppError';
import { VoteType } from '../../../generated/prisma/client';

const toggleVoteSchema = z.object({
  type: z.nativeEnum(VoteType, {
    errorMap: () => ({
      message: 'Invalid vote type. Must be UPVOTE or DOWNVOTE.',
    }),
  }),
});

export class ToggleVoteController {
  async handle(req: Request, res: Response): Promise<Response> {
    const feedbackId = req.params.id;
    const userId = req.user?.id;

    if (!userId) throw new AppError('User not authenticated', 401);

    const parsedData = toggleVoteSchema.parse(req.body);

    const voteRepository = RepositoryFactory.getVoteRepository();
    const feedbackRepository = RepositoryFactory.getFeedbackRepository();
    const useCase = new ToggleVoteUseCase(voteRepository, feedbackRepository);

    await useCase.execute({
      userId,
      feedbackId,
      type: parsedData.type,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Vote toggled successfully',
    });
  }
}
