import {Router} from 'express';
import ContactController from "../controllers/contactControllers.js";
import Middleware from "../middlewares/AuthMiddleware.js";

const contactsRoutes=Router();
contactsRoutes.post("/search",Middleware.verifyUser('cook'),ContactController.searchContacts)

export default contactsRoutes;