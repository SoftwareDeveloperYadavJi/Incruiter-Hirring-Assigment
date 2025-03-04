import { Router } from 'express';
import { login, register, resetPassword, sendTheEmailForResetPassword } from '../controllers/admin.controller';

const adminRouter = Router();


adminRouter.post('/register', register);
adminRouter.post('/login', login);
adminRouter.post('/reset-password', resetPassword);
adminRouter.post('/send-reset-password-email', sendTheEmailForResetPassword);


export default adminRouter;