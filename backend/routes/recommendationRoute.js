// routes/recommendationRoutes.js
import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const recommendationRoutes = express.Router();

// GET recommendations for a user
recommendationRoutes.get("/:userId", getRecommendations);

export default recommendationRoutes;
