import express from 'express';
import multer from 'multer';
import { addRestaurant, getRestaurant, getRestaurantById, removeRestaurant } from '../controllers/restaurantController.js';

const restaurantRoute = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: 'uploads/restaurants', 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Route to add a restaurant
restaurantRoute.post('/add', upload.single('image'), addRestaurant);

// Route to get all restaurant
restaurantRoute.get('/', getRestaurant);

restaurantRoute.get("/:id", getRestaurantById);

restaurantRoute.delete('/remove/:id', removeRestaurant);

export default restaurantRoute;
