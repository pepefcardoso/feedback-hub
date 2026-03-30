import { Router } from 'express';
import { RegisterUserController } from '../controllers/user/RegisterUserController';
import { asyncHandler } from '@shared/utils/asyncHandler';

const userRoutes = Router();
const registerUserController = new RegisterUserController();

userRoutes.post(
  '/register',
  asyncHandler((req, res) => registerUserController.handle(req, res)),
);

export { userRoutes };
