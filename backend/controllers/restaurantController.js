// controllers/restaurantController.js
import restaurantModel from "../models/restaurantModel.js";
import Restaurant from "../models/restaurantModel.js";
import fs from "fs"; // Import fs for file system operations


export const addRestaurant = async (req, res) => {
  try {
    const { name, description, lat, lng, address } = req.body;

    if (!name || !description || !lat || !lng || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const image_filename = req.file.filename;

    const newRestaurant = new Restaurant({
      name,
      description,
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address,
      },
      image: image_filename,
    });

    await newRestaurant.save();

    res.status(201).json({ success: true, message: "Restaurant added successfully", restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all categories
export const getRestaurant = async (req,res) =>{
    try{
        const restaurants = await restaurantModel.find({});
        res.json({success:true,data:restaurants})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
  }

  export const removeRestaurant = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const restaurant = await restaurantModel.findByIdAndDelete(id);
      fs.unlink(`uploads/restaurants/${restaurant.image}`,()=>{})
  
      await restaurantModel.findByIdAndDelete(req.body.id);
  
      res.status(200).json({ success: true, message: 'Restaurant removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };