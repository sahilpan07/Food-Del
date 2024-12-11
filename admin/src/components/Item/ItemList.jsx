import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const ItemList = ({ url }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Function to fetch the food list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        setFilteredItems(response.data.data); // Initialize filtered items
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // Remove from list
  const removeFood = async (foodId) => {
    // Show confirmation dialog before executing remove function
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this item?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.post(`${url}/api/food/remove`, {
          id: foodId,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchList(); // Refetch the list after successful removal
        } else {
          toast.error("Error removing item");
        }
      } catch (error) {
        toast.error("An error occurred while removing the item");
      }
    } else {
      toast.info("Item removal canceled");
    }
  };

  // Filter items based on search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    const filtered = list.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.restaurant.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">All Food List</h2>
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search food or restaurant..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon icon="mdi:magnify" className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left text-gray-700">SN</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Image
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700 w-5/12">
                Food Name
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Restaurant
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 text-gray-700">{item.name}</td>
                <td className="py-3 px-4 text-gray-600">{item.restaurant}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-4">
                    <Link
                      onClick={handleScrollToTop}
                      to={`/item/list/${item._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      onClick={handleScrollToTop}
                      to={`/item/editFood/${item._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => removeFood(item._id)}
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

      {/* Mobile View */}
      <div className="sm:hidden">
        {filteredItems.map((item, index) => (
          <div key={item._id} className="border-b p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md shadow-sm mb-4 sm:mb-0"
              />
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-700">
                  {item.name}
                </p>
                <p className="text-gray-600">{item.restaurant}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <Link
                to={`/item/list/${item._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
              <Link
                to={`/item/editFood/${item._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => removeFood(item._id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
