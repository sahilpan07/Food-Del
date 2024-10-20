import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory = ({ url }) => {
  const [categoryName, setCategoryName] = useState(""); // For inputting a new category
  const [categories, setCategories] = useState([]); // To store the list of existing categories

  // Fetch categories when the component mounts
  useEffect(() => { 
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/categories`);
        if (response.data.success) {
          setCategories(response.data.data); // Store the fetched categories
        } else {
          toast.error("Failed to load categories.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching categories.");
      }
    };

    fetchCategories(); // Call the function to fetch categories
  }, [url]); // This runs when the component mounts

  // Handle form submission to add a new category
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (categoryName.trim() === "") {
      toast.error("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/categories/add`, {
        name: categoryName,
      });

      if (response.data.success) {
        setCategories((prevCategories) => [...prevCategories, { name: categoryName }]); // Update the category list
        toast.success("Category added successfully!");
        setCategoryName(""); // Clear the input field
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the category.");
    }
  };

  return (
    <div className="max-w-xl mb-20 mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manage Categories</h2>

      {/* Form to add new category */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2 font-semibold text-gray-700">New Category Name</label>
          <input
            className="p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            type="text"
            name="category"
            placeholder="Enter new category name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-orange-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          ADD CATEGORY
        </button>
      </form>

      {/* Display list of existing categories */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Existing Categories</h3>
        <ul className="list-disc list-inside">
          {categories.map((category, index) => (
            <li key={index} className="text-lg text-gray-700">
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
