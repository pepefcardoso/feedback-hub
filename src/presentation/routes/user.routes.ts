import { Router } from 'express';
import { RegisterUserController } from '../controllers/user/RegisterUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';
import { GetMeController } from '../controllers/user/GetMeController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { asyncHandler } from '@shared/utils/asyncHandler';

const userRoutes = Router();
const registerUserController = new RegisterUserController();
const loginUserController = new LoginUserController();
const getMeController = new GetMeController();

userRoutes.post(
  '/register',
  asyncHandler((req, res) => registerUserController.handle(req, res)),
);

userRoutes.post(
  '/login',
  asyncHandler((req, res) => loginUserController.handle(req, res)),
);

userRoutes.get(
  '/me',
  ensureAuthenticated,
  asyncHandler((req, res) => getMeController.handle(req, res)),
);

export { userRoutes };
