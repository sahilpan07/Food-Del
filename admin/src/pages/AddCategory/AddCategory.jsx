import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AdminCategoryPanel = ({ url }) => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch existing categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          toast.error("Failed to load categories.");
        }
      } catch (error) {
        toast.error("Error fetching categories.");
      }
    };

    fetchCategories();
  }, [url]);

  // Handle adding a new category
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categoryName.trim() === "") {
      toast.error("Category name cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${url}/api/categories/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        setCategories([...categories, { name: categoryName }]);
        setCategoryName("");
        setImage(null);
        toast.success("Category added successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding category.");
    }
  };

  // Remove category
  const removeCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${url}/api/categories/remove/${categoryId}`
      );
      if (response.data.success) {
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
        toast.success("Category removed successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing category.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      <div className="flex flex-col">
        <label htmlFor="image" className="mb-2 font-semibold text-gray-700">
          Upload Image
        </label>
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            required
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
      {/* Form to add category */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md"
        >
          Add Category
        </button>
      </form>

      {/* List of existing categories */}
      <h3 className="text-lg font-semibold mb-4">Existing Categories</h3>
      <ul className="list-disc list-inside">
        {categories.map((category, idx) => (
          <li key={idx} className="flex mb-2">
            <div className="flex flex-row justify-between w-full">
              <div className="flex items-center">
                <img
                  src={`${url}/images/${category.image}`}
                  className="w-16 h-16 object-cover rounded mr-2"
                />
                <span>{category.name}</span>
              </div>
              <button
                onClick={() => removeCategory(category._id)}
                className="ml-4 text-red-600"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategoryPanel;
