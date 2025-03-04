import { Router } from 'express';
import { register, login , sendTheEmailForResetPassword , resetPassword} from '../controllers/user.controller';


const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/password-reset-email', sendTheEmailForResetPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;