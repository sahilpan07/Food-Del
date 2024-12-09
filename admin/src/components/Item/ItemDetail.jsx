import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"; // Import useParams

const ItemDetail = ({ url }) => {
  const { id } = useParams(); // Extract the food item ID from the URL
  const [item, setItem] = useState(null); // Store the fetched food item

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list/${id}`); // Fetch the specific food item by id
        if (response.data.success) {
          setItem(response.data.data); // Set the fetched item data
        } else {
          toast.error("Error fetching food item details");
        }
      } catch (error) {
        toast.error("An error occurred while fetching item details");
      }
    };

    fetchItemDetail();
  }, [id, url]); // Re-fetch if the ID or URL changes

  if (!item) return <div>Loading...</div>; // Show loading while the data is being fetched
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h3 className="text-4xl font-semibold text-center mb-8 text-blue-600">
        Food Item Details
      </h3>

      <div className="bg-white shadow-2xl rounded-lg p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <img
            src={`${url}/images/${item.image}`}
            className="w-72 h-72 object-cover rounded-lg shadow-md mx-auto"
            alt={item.name}
          />
        </div>

        <div className="text-center text-2xl font-bold text-gray-800 mb-4">
          {item.name}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full sm:w-1/2">
            <strong>Category:</strong> {item.category}
          </div>

          <div className="w-full sm:w-1/2">
            <strong>Price:</strong> ${item.price}
          </div>

          <div className="w-full sm:w-1/2">
            <strong>Description:</strong> {item.description}
          </div>

          <div className="w-full sm:w-1/2">
            <strong>Restaurant:</strong> {item.restaurant}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
