// ListCategory.jsx

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
      const response = await axios.delete(
        `${url}/api/categories/${categoryId}`
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
      console.log(error);
      toast.error("Error removing category.");
    }
  };
  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">List of Categories</h2>
      <ul className="list-disc list-inside">
        {categories.map((category) => (
          <li key={category._id} className="flex mb-2">
            <div className="flex flex-row justify-between w-full">
              <div className="flex items-center">
                <img
                  src={`${url}/images/${category.image}`}
                  className="w-16 h-16 object-cover rounded mr-2"
                  alt={category.name}
                />
                <span>{category.name}</span>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/editcategory/${category._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => removeCategory(category._id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategory;
