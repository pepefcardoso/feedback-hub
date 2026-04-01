export interface ListCommentsDTO {
  feedbackId: string;
}

export interface CommentItemDTO {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
  };
}
