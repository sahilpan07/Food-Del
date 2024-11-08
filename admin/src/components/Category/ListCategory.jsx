import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListCategory = ({ url }) => {
  const [categories, setCategories] = useState([]);

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
  }, []);

  const removeCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`${url}/api/categories/${categoryId}`);

      if (response.data.success) {
        setCategories(categories.filter((category) => category._id !== categoryId));
        toast.success("Category removed successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing category.");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-4xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">List of Categories</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category._id} className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center gap-4">
              <img
                src={`${url}/images/${category.image}`}
                className="w-16 h-16 object-cover rounded-full"
                alt={category.name}
              />
              <span className="text-xl text-gray-700">{category.name}</span>
            </div>
            <div className="flex gap-4">
              <Link
                to={`/editcategory/${category._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => removeCategory(category._id)}
                className="text-red-600 hover:underline"
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

export default ListCategory;
