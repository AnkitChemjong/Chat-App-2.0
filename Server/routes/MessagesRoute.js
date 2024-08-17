import {Router} from "express";
import Middleware from "../middlewares/AuthMiddleware.js";
import MessageController from "../controllers/MessagesController.js";

const messagesRoute=Router();

messagesRoute.post("/get-messages",Middleware.verifyUser("cook"),MessageController.getMessages)

export default messagesRoute;