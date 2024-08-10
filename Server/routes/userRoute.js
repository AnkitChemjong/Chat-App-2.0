import {Router} from 'express';
import UserController from '../controllers/AuthController.js';
import Middleware from '../middlewares/AuthMiddleware.js';

const userRoute=Router();

userRoute.post('/signup',UserController.signup);
userRoute.post('/login',UserController.login);
userRoute.get('/user-info',Middleware.verifyToken('cook'),UserController.getUserInfo);
export default userRoute;