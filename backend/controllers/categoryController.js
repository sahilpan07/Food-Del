import categoryModel from "../models/categoryModel.js";
import fs from "fs"; // Import fs for file system operations
import path from "path";

export const addCategory = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const category = new categoryModel({
    name: req.body.name,
    image: image_filename,
  });
  try {
    await category.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    const count = await categoryModel.countDocuments();
    res.json({ success: true, data: categories, count });  
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    if (category && category.image) {
      const imagePath = path.join("uploads/categories", category.image);
      fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in removeRestaurant:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting restaurant" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await categoryModel.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    // Log before updating category

    if (req.file) {
      // If a new image is uploaded, delete the old one
      const oldImagePath = path.join("uploads/categories", category.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);

      // Update category with the new image
      category.image = req.file.filename;
    }

    category.name = name;

    await category.save();

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const getCategorySearchResults = async (query) => {
  const regex = new RegExp(query, 'i');
  const results = await categoryModel.find({
    $or: [
      { name: { $regex: regex } },
    ]
  });
  return results;
};