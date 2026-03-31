import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateFeedbackStatusUseCase } from '@application/useCases/feedback/UpdateFeedbackStatusUseCase';
import { PrismaFeedbackRepository } from '@infrastructure/repositories/PrismaFeedbackRepository';
import prisma from '@infrastructure/database/prisma';
import { FeedbackStatus } from '../../../generated/prisma/client';

const updateFeedbackStatusSchema = z.object({
  status: z.enum(['IDEA', 'PLANNED', 'IN_PROGRESS', 'COMPLETED']),
});

export class UpdateFeedbackStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const parsedBody = updateFeedbackStatusSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    const { status } = parsedBody.data;

    const feedbackRepository = new PrismaFeedbackRepository(prisma);
    const updateFeedbackStatusUseCase = new UpdateFeedbackStatusUseCase(
      feedbackRepository,
    );

    const updatedFeedback = await updateFeedbackStatusUseCase.execute({
      id,
      status: status as FeedbackStatus,
    });

    return res.json(updatedFeedback);
  }
}
