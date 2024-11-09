import foodModel from "../models/foodModel.js";
import fs from "fs"; //fs file system that is prebuild in node js

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    restaurant: req.body.restaurant,
    image: image_filename,
  });
  try{
    await food.save();
    res.json({success:true, message:"Food Added"})
  }
  catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
  }
};

//all food list
const listFood = async (req,res) =>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const foods = await foodModel.findById(id);

    if (!foods) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error in getRestaurantById:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//remove foo item
const removeFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


export { addFood, listFood, removeFood };
