import { ICommentRepository } from '@domain/repositories/ICommentRepository';
import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import { AppError } from '@shared/errors/AppError';
import { ListCommentsDTO, CommentItemDTO } from './ListCommentsDTO';

export class ListCommentsUseCase {
  constructor(
    private commentRepository: ICommentRepository,
    private feedbackRepository: IFeedbackRepository,
  ) {}

  async execute(data: ListCommentsDTO): Promise<CommentItemDTO[]> {
    const feedback = await this.feedbackRepository.findById(data.feedbackId);

    if (!feedback) {
      throw new AppError('Feedback not found', 404);
    }

    const comments = await this.commentRepository.findByFeedbackId(
      data.feedbackId,
    );

    return comments.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: {
        id: comment.author.id,
        name: comment.author.name,
      },
    }));
  }
}
