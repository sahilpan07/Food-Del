import express from "express"
import authMiddleware from "../middleware/auth.js";
import restaurantRegistrationController from "../controllers/restaurantRegisterController.js";

//create express router
const restaurantRegistrationRoute = express.Router();

restaurantRegistrationRoute.post('/restaurant-registration', authMiddleware, restaurantRegistrationController);


export default restaurantRegistrationRoute;