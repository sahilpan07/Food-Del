// AddCategory.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddCategory = ({ url }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

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
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
