import express from "express";
import {
  addRestaurant,
  getRestaurant,
  getRestaurantById,
  updateRestaurant,
  removeRestaurant,
  getNearestRestaurants,
} from "../controllers/restaurantController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer setup for image upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/restaurants");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// Routes
router.post("/add", upload.single("image"), addRestaurant);
router.get("/", getRestaurant);
router.put("/:id", upload.single("image"), updateRestaurant);
router.delete("/:id", removeRestaurant);

// Route for nearest restaurants
// Fetch restaurant by ID
router.get("/restaurant/:id", getRestaurantById);  // Use a more specific route for restaurant by ID

// Fetch nearest restaurants
router.get("/nearest", getNearestRestaurants);  
export default router;
