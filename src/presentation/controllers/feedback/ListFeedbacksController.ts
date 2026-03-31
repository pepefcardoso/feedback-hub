import { Request, Response } from 'express';
import { z } from 'zod';
import { ListFeedbacksUseCase } from '@application/useCases/feedback/ListFeedbacksUseCase';
import { RepositoryFactory } from '@infrastructure/factories/RepositoryFactory';

const listFeedbacksSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(50).optional().default(10),
  category: z.string().trim().optional(),
  sortBy: z.enum(['votes', 'createdAt']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

export class ListFeedbacksController {
  async handle(req: Request, res: Response): Promise<Response> {
    const parsedQuery = listFeedbacksSchema.parse(req.query);

    const feedbackRepository = RepositoryFactory.getFeedbackRepository();
    const useCase = new ListFeedbacksUseCase(feedbackRepository);

    const result = await useCase.execute(parsedQuery);

    return res.status(200).json({
      status: 'success',
      data: result.data,
      meta: result.meta,
    });
  }
}
