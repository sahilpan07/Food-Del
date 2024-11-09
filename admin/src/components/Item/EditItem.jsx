import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const EditfoodItem = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setfoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchfoodItemDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list/${id}`);
        if (response.data.success) {
          setfoodItem(response.data.data);
        } else {
          toast.error("Failed to load Food details.");
        }
      } catch (error) {
        toast.error("Error fetching Food details.");
      } finally {
        setLoading(false);
      }
    };
    fetchfoodItemDetails();
  }, [id, url]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", foodItem.name);
    formData.append("description", foodItem.description);
    formData.append("category", foodItem.category);
    formData.append("restaurant", foodItem.restaurant);
    formData.append("price", foodItem.price);

    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const response = await axios.put(`${url}/api/food/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("foodItem updated successfully!");
        navigate(`/item/list/${id}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during foodItem update:", error);
      toast.error("Error updating foodItem.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!foodItem) return <p>foodItem not found.</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Edit foodItem
      </h2>
      <form
        onSubmit={handleUpdate}
        className="space-y-6 bg-white shadow-lg p-8 rounded-lg border"
      >
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            foodItem Name
          </label>
          <input
            type="text"
            value={foodItem.name}
            onChange={(e) => setfoodItem({ ...foodItem, name: e.target.value })}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="text-lg  text-gray-600">
          <strong>Restaurant:</strong> {foodItem.restaurant}
        </div>
        <div className="flex gap-4">
          <div className="w-full text-lg  text-gray-600">
            <strong>Category:</strong> {foodItem.category}
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              value={foodItem.price}
              onChange={(e) =>
                setfoodItem({ ...foodItem, price: e.target.value })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={foodItem.description}
            onChange={(e) =>
              setfoodItem({ ...foodItem, description: e.target.value })
            }
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="flex">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Current Image
            </label>
            {foodItem.image && (
              <img
                src={`${url}/images/${foodItem.image}`}
                alt="foodItem"
                className="w-48 h-48 object-cover mb-4 rounded-lg border"
              />
            )}
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="image"
              className="text-lg font-medium text-gray-700 mb-2"
            >
              Change Image
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition">
              <input
                type="file"
                onChange={(e) => setNewImage(e.target.files[0])}
                id="newImage"
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="newImage" className="flex flex-col items-center">
                <img
                  className="w-28"
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : assets.upload_area
                  }
                  alt="Upload Area"
                />
                <span className="text-gray-500 mt-2">
                  {newImage ? newImage.name : "Click to upload an image"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Update foodItem
        </button>
      </form>
    </div>
  );
};

export default EditfoodItem;
