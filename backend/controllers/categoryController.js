import categoryModel from "../models/categoryModel.js";
import fs from "fs"; // Import fs for file system operations

// Add a new category
/* export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    // Save the image filename
    const image_filename = req.file.filename;

    const category = new categoryModel({ name, image: image_filename });
    await category.save();

    res.status(201).json({ success: true, message: 'Category added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}; */
export const addCategory = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const category = new categoryModel({
    name: req.body.name,
    image: image_filename,
  });
  try{
    await category.save();
    res.json({success:true, message:"Food Added"})
  }
  catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
  }
};

// Get all categories
export const getCategories = async (req,res) =>{
  try{
      const categories = await categoryModel.find({});
      res.json({success:true,data:categories})
  }
  catch(error){
      console.log(error);
      res.json({success:false,message:"Error"})
  }
}

export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const category = await categoryModel.findByIdAndDelete(id); // Find and delete the category
    fs.unlink(`uploads/categories/${category.image}`,()=>{})

    await categoryModel.findByIdAndDelete(req.body.id);

    res.status(200).json({ success: true, message: 'Category removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};