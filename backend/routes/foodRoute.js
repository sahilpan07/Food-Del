import express from "express"
import { addFood, getFoodById, listFood,removeFood, updateFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter = express.Router();

//Image storage engine

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/foodItem");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
  });


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.get("/list/:id", getFoodById);

foodRouter.post("/remove",removeFood);
foodRouter.put("/:id", upload.single("image"), updateFood);


export default foodRouter;