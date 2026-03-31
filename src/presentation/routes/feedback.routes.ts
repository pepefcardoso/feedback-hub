import { Router } from 'express';
import { CreateFeedbackController } from '../controllers/feedback/CreateFeedbackController';
import { ListFeedbacksController } from '../controllers/feedback/ListFeedbacksController';
import { ToggleVoteController } from '../controllers/vote/ToggleVoteController';
import { asyncHandler } from '@shared/utils/asyncHandler';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { UpdateFeedbackStatusController } from '../controllers/feedback/UpdateFeedbackStatusController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const feedbackRoutes = Router();
const createFeedbackController = new CreateFeedbackController();
const listFeedbacksController = new ListFeedbacksController();
const toggleVoteController = new ToggleVoteController();
const updateFeedbackStatusController = new UpdateFeedbackStatusController();

feedbackRoutes.get(
  '/',
  asyncHandler((req, res) => listFeedbacksController.handle(req, res)),
);

feedbackRoutes.post(
  '/',
  ensureAuthenticated,
  asyncHandler((req, res) => createFeedbackController.handle(req, res)),
);

feedbackRoutes.post(
  '/:id/vote',
  ensureAuthenticated,
  asyncHandler((req, res) => toggleVoteController.handle(req, res)),
);

feedbackRoutes.patch(
  '/:id/status',
  ensureAuthenticated,
  ensureAdmin,
  asyncHandler((req, res) => updateFeedbackStatusController.handle(req, res)),
);

export { feedbackRoutes };
