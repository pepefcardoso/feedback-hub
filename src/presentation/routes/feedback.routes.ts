import { Router } from 'express';
import { CreateFeedbackController } from '../controllers/feedback/CreateFeedbackController';
import { asyncHandler } from '@shared/utils/asyncHandler';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const feedbackRoutes = Router();
const createFeedbackController = new CreateFeedbackController();

feedbackRoutes.post(
  '/',
  ensureAuthenticated,
  asyncHandler((req, res) => createFeedbackController.handle(req, res)),
);

export { feedbackRoutes };
