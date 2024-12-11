import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const ListCategory = ({ url }) => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
          setFilteredCategories(response.data.data); // Initialize filtered categories
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
    // Show confirmation dialog before executing remove function
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this category?"
    );

    if (isConfirmed) {
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
        toast.error("Error removing category.");
      }
    } else {
      // If the user cancels, do nothing
      toast.info("Category removal canceled");
    }
  };

  // Handle search input change and filter categories
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query)
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="md:flex md:justify-between">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-6">
          List of Categories
        </h2>
        <div className="relative mb-6 w-full sm:w-96">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon icon="mdi:magnify" className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse hidden sm:block">
          <thead>
            <tr className="bg-gray-100">
              <th className=" py-3 px-4 border-b text-left text-gray-700">
                SN
              </th>
              <th className=" py-3 px-4 border-b text-left text-gray-700">
                Image
              </th>
              <th className="w-full py-3 px-4 border-b text-left text-gray-700 w-1/2">
                Category Name
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
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
                      onClick={handleScrollToTop}
                      to={`/category/categoryDetail/${category._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      onClick={handleScrollToTop}
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

        <div className="sm:hidden">
          {filteredCategories.map((category, index) => (
            <div
              key={category._id}
              className="bg-white shadow-md rounded-lg p-6 mb-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={`${url}/images/${category.image}`}
                  className="w-24 h-24 object-cover rounded-full mb-4 sm:mb-0"
                  alt={category.name}
                />
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-700">
                    {category.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4 justify-center">
                <div>
                  <Link
                    to={`/category/categoryDetail/${category._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
                <div>
                  <Link
                    to={`/category/editCategory/${category._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => removeCategory(category._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
