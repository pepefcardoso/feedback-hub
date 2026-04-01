import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import { IVoteRepository } from '@domain/repositories/IVoteRepository';
import { ListFeedbacksDTO, ListFeedbacksResponseDTO } from './ListFeedbacksDTO';

export class ListFeedbacksUseCase {
  constructor(
    private feedbackRepository: IFeedbackRepository,
    private voteRepository: IVoteRepository,
  ) {}

  async execute(data: ListFeedbacksDTO): Promise<ListFeedbacksResponseDTO> {
    const page = data.page || 1;
    const limit = data.limit || 10;
    const skip = (page - 1) * limit;

    const [feedbacks, totalItems] = await Promise.all([
      this.feedbackRepository.findAll({
        skip,
        take: limit,
        category: data.category,
        sortBy: data.sortBy,
        order: data.order,
      }),
      this.feedbackRepository.count({ category: data.category }),
    ]);

    let userVotedIds = new Set<string>();

    if (data.userId && feedbacks.length > 0) {
      const feedbackIds = feedbacks.map((fb: any) => fb.id);
      const votes = await this.voteRepository.findManyByUserAndFeedbacks(
        data.userId,
        feedbackIds,
      );
      userVotedIds = new Set(votes.map((v) => v.feedbackId));
    }

    const mappedData = feedbacks.map((fb: any) => ({
      id: fb.id,
      title: fb.title,
      description: fb.description,
      category: fb.category,
      status: fb.status,
      author: { id: fb.author.id, name: fb.author.name },
      voteCount: fb.voteCount,
      hasVoted: userVotedIds.has(fb.id),
      createdAt: fb.createdAt,
    }));

    return {
      data: mappedData,
      meta: {
        totalItems,
        itemCount: feedbacks.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }
}
