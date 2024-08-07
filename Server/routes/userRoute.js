import {Router} from 'express';
import UserController from '../controllers/AuthController.js';

const userRoute=Router();

userRoute.post('/signup',UserController.signup);

export default userRoute;