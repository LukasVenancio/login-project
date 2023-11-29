import { Router } from 'express';
import { UserController } from '../controllers/User';

const userRouter = Router();

const controller = new UserController();

userRouter.post('/', controller.create);
userRouter.patch('/validate-email', controller.validateEmail);
userRouter.post('/generate-access-code', controller.generateAccessCode);
userRouter.post('/login', controller.login);

export default userRouter;

