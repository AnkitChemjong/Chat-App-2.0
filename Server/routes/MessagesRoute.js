import {Router} from "express";
import Middleware from "../middlewares/AuthMiddleware.js";
import MessageController from "../controllers/MessagesController.js";
import multer from "multer";
import path from 'path';

const messagesRoute=Router();
const upload=multer({dest:path.resolve("./uploads/files")});

messagesRoute.post("/get-messages",Middleware.verifyUser("cook"),MessageController.getMessages)

messagesRoute.post("/upload-file",Middleware.verifyUser("cook"),upload.single("file"),MessageController.uploadFile)

export default messagesRoute;