import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import {
  CreateFeedbackDTO,
  CreateFeedbackResponseDTO,
} from './CreateFeedbackDTO';

export class CreateFeedbackUseCase {
  constructor(private feedbackRepository: IFeedbackRepository) {}

  async execute(data: CreateFeedbackDTO): Promise<CreateFeedbackResponseDTO> {
    const feedback = await this.feedbackRepository.create({
      title: data.title,
      description: data.description,
      category: data.category,
      authorId: data.authorId,
    });

    return {
      id: feedback.id,
      title: feedback.title,
      description: feedback.description,
      category: feedback.category,
      status: feedback.status,
      authorId: feedback.authorId,
      createdAt: feedback.createdAt,
    };
  }
}
