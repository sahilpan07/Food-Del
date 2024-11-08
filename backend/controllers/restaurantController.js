import restaurantModel from "../models/restaurantModel.js";
import fs from "fs";
import path from "path"; // Ensure path module is imported for file operations

export const addRestaurant = async (req, res) => {
  try {
    const {name, ownerName, email, phone, liscense, tax, type, time, description, lat, lng, address} = req.body;

    if (!name || !ownerName || !email || !phone || !liscense || !tax || !type || !time || !description || !address || !lat || !lng ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const image_filename = req.file.filename;

    const newRestaurant = new restaurantModel({
      name,
      ownerName,
      email, phone,
      liscense,
      tax,
      type,
      time,
      description,
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      address,
      image: image_filename,
    });

    await newRestaurant.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Restaurant added successfully",
        restaurant: newRestaurant,
      });
  } catch (error) {
    console.error("Error in addRestaurant:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error("Error in getRestaurant:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching restaurants" });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error in getRestaurantById:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address, lat, lng } = req.body;

    const restaurant = await restaurantModel.findById(id);
    if (!restaurant)
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });

    // Log before updating restaurant
    console.log("Updating restaurant:", restaurant);

    if (req.file) {
      // If a new image is uploaded, delete the old one
      const oldImagePath = path.join("uploads/restaurants", restaurant.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);

      // Update restaurant with the new image
      restaurant.image = req.file.filename;
    }

    restaurant.name = name;
    restaurant.description = description;
    restaurant.address = address;
    restaurant.location.lat = lat;
    restaurant.location.lng = lng;

    await restaurant.save();

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error in updateRestaurant:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findByIdAndDelete(id);

    if (restaurant && restaurant.image) {
      // If image exists, delete it
      const imagePath = path.join("uploads/restaurants", restaurant.image);
      fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
    }

    res
      .status(200)
      .json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error in removeRestaurant:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting restaurant" });
  }
};
