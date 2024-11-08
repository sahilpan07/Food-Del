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
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left text-gray-700">SN</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Image</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Category Name</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="border-b">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <img
                  src={`${url}/images/${category.image}`}
                  className="w-16 h-16 object-cover rounded-full"
                  alt={category.name}
                />
              </td>
              <td className="py-3 px-4 text-gray-700">{category.name}</td>
              <td className="py-3 px-4">
                <div className="flex gap-4">
                  <Link
                    to={`/category/editCategory/${category._id}`}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;
