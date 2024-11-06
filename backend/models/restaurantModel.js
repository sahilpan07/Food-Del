// models/restaurantModel.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
});

const restaurantModel =
  mongoose.models.restaurant || mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;
