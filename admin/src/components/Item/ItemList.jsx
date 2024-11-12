import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ItemList = ({ url }) => {
  const [list, setList] = useState([]);

  // Function to fetch the food list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // Remove from list
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Food List</h2>
  
      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left text-gray-700">SN</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Image</th>
              <th className="py-3 px-4 border-b text-left text-gray-700 w-5/12">Food Name</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Restaurant</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
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
                      to={`/item/list/${item._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Mobile View */}
      <div className="sm:hidden">
        {list.map((item, index) => (
          <div key={item._id} className="border-b p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md shadow-sm mb-4 sm:mb-0"
              />
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-700">{item.name}</p>
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
