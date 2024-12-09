import express from "express";
import { getSearchResults } from "../controllers/serachController.js";

const searchRoute = express.Router();

// Global search route
searchRoute.get("/search", getSearchResults);

export default searchRoute;
