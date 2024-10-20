import express from 'express';
import { addCategory, getCategories } from '../controllers/categoryController.js';
import multer from 'multer';

const categoryRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: 'uploads/categories', // Specify the upload destination
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Format filename to include timestamp
  },
});

const upload = multer({ storage: storage });

// Route to add a category
categoryRouter.post('/add', upload.single('image'), addCategory); // Handle image upload

// Route to get all categories
categoryRouter.get('/', getCategories);

export default categoryRouter;
