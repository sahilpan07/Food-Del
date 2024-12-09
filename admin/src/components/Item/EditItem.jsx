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
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">
        Edit FoodItem
      </h2>

      <form
        onSubmit={handleUpdate}
        className="space-y-6 bg-white shadow-lg p-8 rounded-lg border"
      >
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Current Image
          </label>
          {foodItem.image && (
            <img
              src={`${url}/images/${foodItem.image}`}
              alt="Food Item"
              className="w-48 h-48 object-cover mb-4 rounded-lg border"
            />
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="newImage"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Change Image
          </label>
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 sm:p-8 rounded-xl cursor-pointer hover:bg-gray-200 transition">
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              id="newImage"
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="newImage" className="flex flex-col items-center">
              <img
                className="w-24 sm:w-28"
                src={
                  newImage ? URL.createObjectURL(newImage) : assets.upload_area
                }
                alt="Upload Area"
              />
              <span className="text-gray-500 mt-2">
                {newImage ? newImage.name : "Click to upload an image"}
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Food Item Name
          </label>
          <input
            className="w-full p-3 border rounded-md"
            onChange={(e) => setfoodItem({ ...foodItem, name: e.target.value })}
            value={foodItem.name}
            type="text"
            name="name"
            placeholder="Type Here"
            required
          />
        </div>

        <div className="text-lg text-gray-600">
          <strong>Restaurant:</strong> {foodItem.restaurant}
        </div>

        <div className="flex gap-6">
          <div className="w-full">
            <label
              htmlFor="category"
              className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
            >
              Category
            </label>
            <div className="text-lg text-gray-600">{foodItem.category}</div>
          </div>
          <div className="w-full">
            <label
              htmlFor="price"
              className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              className="w-full p-3 border rounded-md"
              onChange={(e) =>
                setfoodItem({ ...foodItem, price: e.target.value })
              }
              value={foodItem.price}
              type="text"
              name="price"
              placeholder="$100"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            className="w-full p-3 border rounded-md"
            onChange={(e) =>
              setfoodItem({ ...foodItem, description: e.target.value })
            }
            value={foodItem.description}
            name="description"
            rows="6"
            placeholder="Write description here"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-blue-500 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          Update FoodItem
        </button>
      </form>
    </div>
  );
};

export default EditfoodItem;
