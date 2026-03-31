import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import { AppError } from '@shared/errors/AppError';
import { FeedbackStatus } from '../../../generated/prisma/client';

export interface UpdateFeedbackStatusDTO {
  id: string;
  status: FeedbackStatus;
}

export class UpdateFeedbackStatusUseCase {
  constructor(private feedbackRepository: IFeedbackRepository) {}

  async execute({ id, status }: UpdateFeedbackStatusDTO) {
    const feedback = await this.feedbackRepository.findById(id);

    if (!feedback) {
      throw new AppError('Feedback not found', 404);
    }

    return await this.feedbackRepository.update(id, { status });
  }
}
