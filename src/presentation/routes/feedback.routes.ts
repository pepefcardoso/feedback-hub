import { Router } from 'express';
import { CreateFeedbackController } from '../controllers/feedback/CreateFeedbackController';
import { ListFeedbacksController } from '../controllers/feedback/ListFeedbacksController';
import { asyncHandler } from '@shared/utils/asyncHandler';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const feedbackRoutes = Router();
const createFeedbackController = new CreateFeedbackController();
const listFeedbacksController = new ListFeedbacksController();

feedbackRoutes.get(
  '/',
  asyncHandler((req, res) => listFeedbacksController.handle(req, res)),
);

feedbackRoutes.post(
  '/',
  ensureAuthenticated,
  asyncHandler((req, res) => createFeedbackController.handle(req, res)),
);

export { feedbackRoutes };
