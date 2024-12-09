import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddCategory = ({ url }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !image) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/categories/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success("Category added successfully!");
        setName("");
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding category.");
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg max-w-2xl">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Add Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 sm:p-8 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
          />
          <label htmlFor="image" className="flex flex-col items-center">
            <img
              className="w-48 sm:w-56 h-48 sm:h-56 object-cover"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Area"
            />
            <span className="text-gray-500 mt-2">
              {image ? image.name : "Click to upload an image"}
            </span>
          </label>
        </div>

        <div className="flex justify-between items-center">
          {errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
          <button
            type="submit"
            className="w-full sm:w-64 bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
