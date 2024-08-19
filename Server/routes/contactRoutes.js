import {Router} from 'express';
import ContactController from "../controllers/contactControllers.js";
import Middleware from "../middlewares/AuthMiddleware.js";

const contactsRoutes=Router();
contactsRoutes.post("/search",Middleware.verifyUser('cook'),ContactController.searchContacts)
contactsRoutes.get("/get-contacts-for-dm",Middleware.verifyUser('cook'),ContactController.getContactsForDMList)
contactsRoutes.get("/get-all-contacts",Middleware.verifyUser('cook'),ContactController.getAllContacts);
export default contactsRoutes;