import express from "express"
import authMiddleware from "../middleware/auth.js";
import riderRegistrationController from "../controllers/riderRegistrationController.js";

//create express router
const riderRegistrationRoute = express.Router();

riderRegistrationRoute.post('/riders-registration', authMiddleware, riderRegistrationController);


export default riderRegistrationRoute;