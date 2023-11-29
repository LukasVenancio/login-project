import { Router } from 'express';
import { UserController } from '../controllers/User';

const userRouter = Router();

const controller = new UserController();

userRouter.post('/', controller.create);

export default userRouter;

