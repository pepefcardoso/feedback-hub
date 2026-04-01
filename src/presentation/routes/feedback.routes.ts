import { Router } from 'express';
import { CreateFeedbackController } from '../controllers/feedback/CreateFeedbackController';
import { ListFeedbacksController } from '../controllers/feedback/ListFeedbacksController';
import { ToggleVoteController } from '../controllers/vote/ToggleVoteController';
import { UpdateFeedbackStatusController } from '../controllers/feedback/UpdateFeedbackStatusController';
import { GetFeedbackByIdController } from '../controllers/feedback/GetFeedbackByIdController';
import { CreateCommentController } from '../controllers/comment/CreateCommentController';
import { ListCommentsController } from '../controllers/comment/ListCommentsController';
import { asyncHandler } from '@shared/utils/asyncHandler';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { optionalAuth } from '../middlewares/optionalAuth';

const feedbackRoutes = Router();

const createFeedbackController = new CreateFeedbackController();
const listFeedbacksController = new ListFeedbacksController();
const toggleVoteController = new ToggleVoteController();
const updateFeedbackStatusController = new UpdateFeedbackStatusController();
const getFeedbackByIdController = new GetFeedbackByIdController();
const createCommentController = new CreateCommentController();
const listCommentsController = new ListCommentsController();

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

feedbackRoutes.get(
  '/:id',
  optionalAuth,
  asyncHandler((req, res) => getFeedbackByIdController.handle(req, res)),
);

feedbackRoutes.post(
  '/:id/comments',
  ensureAuthenticated,
  asyncHandler((req, res) => createCommentController.handle(req, res)),
);

feedbackRoutes.get(
  '/:id/comments',
  asyncHandler((req, res) => listCommentsController.handle(req, res)),
);

export { feedbackRoutes };
