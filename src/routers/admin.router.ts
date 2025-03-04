import { Router } from 'express';
import { login, register, resetPassword, sendTheEmailForResetPassword , getAllUsers, deletePost} from '../controllers/admin.controller';

const adminRouter = Router();


adminRouter.post('/register', register);
adminRouter.post('/login', login);
adminRouter.post('/reset-password', resetPassword);
adminRouter.post('/send-reset-password-email', sendTheEmailForResetPassword);
adminRouter.get('/get-all-users', getAllUsers);
adminRouter.delete('/delete-post/:id', deletePost);


export default adminRouter;