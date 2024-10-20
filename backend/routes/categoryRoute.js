import express from 'express';
import { addCategory, getCategories, removeCategory } from '../controllers/categoryController.js';
import multer from 'multer';

const categoryRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: 'uploads/categories', 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Route to add a category
categoryRouter.post('/add', upload.single('image'), addCategory);

// Route to get all categories
categoryRouter.get('/', getCategories);

categoryRouter.delete('/remove/:id', removeCategory);

export default categoryRouter;
