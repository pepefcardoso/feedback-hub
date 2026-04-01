export interface GetFeedbackByIdRequestDTO {
  id: string;
  userId?: string;
}

export interface GetFeedbackByIdResponseDTO {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  voteCount: number;
  createdAt: Date;
  author: {
    id: string;
    name: string;
  };
  hasVoted: boolean;
}
