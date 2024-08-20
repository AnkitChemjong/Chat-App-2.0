import {Router} from 'express';
import ChannelController from "../controllers/ChannelController.js";
import Middleware from "../middlewares/AuthMiddleware.js";

const channelRouter=new Router();

channelRouter.post("/create-channel",Middleware.verifyUser('cook'),ChannelController.createChannel);
channelRouter.get("/get-user-channels",Middleware.verifyUser('cook'),ChannelController.getUserChannels);
channelRouter.get("/get-channel-messages/:channelId",Middleware.verifyUser('cook'),ChannelController.getChannelMessages);
export default channelRouter;