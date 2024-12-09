import express from "express";
import { getBotResponse } from "../controllers/chatbotController.js";

//create express router
const chatbotRoute = express.Router();

chatbotRoute.post("/api/chatbot", getBotResponse);

export default chatbotRoute;
