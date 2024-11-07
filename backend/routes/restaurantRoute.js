import express from "express";
import {
  addRestaurant,
  getRestaurant,
  getRestaurantById,
  updateRestaurant,
  removeRestaurant,
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
router.get("/:id", getRestaurantById);
router.put("/:id", upload.single("image"), updateRestaurant);
router.delete("/:id", removeRestaurant);

export default router;
