import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddRestaurant = ({ url }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch existing restaurants from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants`);
        if (response.data.success) {
          setRestaurants(response.data.data);
        } else {
          toast.error("Failed to load restaurants.");
        }
      } catch (error) {
        toast.error("Error fetching restaurants.");
      }
    };

    fetchRestaurants();
  }, []);

  // Handle adding a new restaurant
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !address || !lat || !lng || !image) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${url}/api/restaurants/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setRestaurants([...restaurants, response.data.restaurant]);
        toast.success("Restaurant added successfully!");
        setErrorMessage("");
        // Clear form fields
        setName("");
        setDescription("");
        setAddress("");
        setLat("");
        setLng("");
        setImage(null);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding restaurant.");
    }
  };

  // Remove restaurant
  const removeRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(
        `${url}/api/restaurants/remove/${restaurantId}`
      );
      if (response.data.success) {
        setRestaurants(
          restaurants.filter((restaurant) => restaurant._id !== restaurantId)
        );
        toast.success("Restaurant removed successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing restaurant.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add a Restaurant</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white shadow-lg p-8 rounded-lg border">
        <div>
          <label className="block text-lg font-medium text-gray-700">Restaurant Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md mt-2 text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter restaurant name"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            className="w-full p-3 border rounded-md mt-2 text-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter restaurant description"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md mt-2 text-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-lg font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              className="w-full p-3 border rounded-md mt-2 text-lg"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Enter latitude"
            />
          </div>

          <div className="flex-1">
            <label className="block text-lg font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              className="w-full p-3 border rounded-md mt-2 text-lg"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="Enter longitude"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-lg font-medium text-gray-700 mb-2">Upload Image</label>
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="image" className="flex flex-col items-center">
              <img
                className="w-28"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Area"
              />
              <span className="text-gray-500 mt-2">
                {image ? image.name : "Click to upload an image"}
              </span>
            </label>
          </div>
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Add Restaurant
        </button>
      </form>

      {/* List of Existing Restaurants */}
      <h3 className="text-2xl font-semibold mt-12 text-gray-800">Existing Restaurants</h3>
      <ul className="space-y-6 mt-6">
        {restaurants.map((restaurant, idx) => (
          <li key={idx} className="flex justify-between items-center p-4 bg-white border rounded-md shadow-sm">
            <div className="flex items-center space-x-4">
              <img
                src={`${url}/images/${restaurant.image}`}
                className="w-16 h-16 object-cover rounded-lg"
                alt={restaurant.name}
              />
              <span className="text-lg font-medium text-gray-700">{restaurant.name}</span>
            </div>
            <button
              onClick={() => removeRestaurant(restaurant._id)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddRestaurant;
