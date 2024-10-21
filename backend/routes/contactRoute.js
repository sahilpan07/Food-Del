import express from "express"
import authMiddleware from "../middleware/auth.js";
import contactController from "../controllers/contactController.js";

//create express router
const contactRouter = express.Router();

contactRouter.post('/send-email', authMiddleware, contactController);


export default contactRouter;