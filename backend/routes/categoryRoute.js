// categoryRoute.js

import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  removeCategory,
  getCategoryById,
} from "../controllers/categoryController.js";
import multer from "multer";
import path from "path";

const categoryRouter = express.Router();

// Multer setup for image upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/categories");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// Route to add a category
categoryRouter.post("/add", upload.single("image"), addCategory);

// Route to get all categories
categoryRouter.get("/", getCategories);

categoryRouter.get("/:id", getCategoryById);

// Route to update a category
categoryRouter.put("/:id", upload.single("image"), updateCategory);

// Route to remove a category
categoryRouter.delete("/:id", removeCategory);

export default categoryRouter;
