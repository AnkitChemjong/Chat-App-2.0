import {Router} from 'express';
import UserController from '../controllers/AuthController.js';
import Middleware from '../middlewares/AuthMiddleware.js';
import upload from '../multer/userImage.js';


const userRoute=Router();

userRoute.post('/signup',UserController.signup);
userRoute.post('/login',UserController.login);
userRoute.get('/user-info',Middleware.verifyToken('cook'),UserController.getUserInfo);
userRoute.post('/update-profile',Middleware.verifyUser('cook'),UserController.updateProfile);
userRoute.post('/add-profile-image',Middleware.verifyUser('cook'),upload.single("profile-image"),UserController.addProfileImage);
userRoute.delete('/remove-profile-image',Middleware.verifyUser('cook'),UserController.removeProfileImage);
userRoute.delete('/logout',Middleware.verifyUser('cook'),UserController.logOut);
export default userRoute;