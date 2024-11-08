import React, { useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");

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
        toast.success("Restaurant added successfully!");
        setErrorMessage("");
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

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Add a Restaurant
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg p-8 rounded-lg border"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Restaurant Name"
          className="w-full p-3 border rounded-md"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full p-3 border rounded-md"
        />
        <div className="flex space-x-4">
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude"
            className="w-full p-3 border rounded-md"
          />
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Longitude"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-lg font-medium text-gray-700 mb-2"
          >
            Upload Image
          </label>
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
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
