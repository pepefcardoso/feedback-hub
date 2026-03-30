import { Router } from 'express';
import { RegisterUserController } from '../controllers/user/RegisterUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';
import { asyncHandler } from '@shared/utils/asyncHandler';

const userRoutes = Router();
const registerUserController = new RegisterUserController();
const loginUserController = new LoginUserController();

userRoutes.post(
  '/register',
  asyncHandler((req, res) => registerUserController.handle(req, res)),
);

userRoutes.post(
  '/login',
  asyncHandler((req, res) => loginUserController.handle(req, res)),
);

export { userRoutes };
