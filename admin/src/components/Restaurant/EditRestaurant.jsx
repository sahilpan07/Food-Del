import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const EditRestaurant = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants/${id}`);
        if (response.data.success) {
          setRestaurant(response.data.data);
        } else {
          toast.error("Failed to load restaurant details.");
        }
      } catch (error) {
        toast.error("Error fetching restaurant details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantDetails();
  }, [id, url]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Log form data to see what is being sent
    console.log("Updating restaurant with the following data:", restaurant);

    const formData = new FormData();
    formData.append("name", restaurant.name);
    formData.append("description", restaurant.description);
    formData.append("address", restaurant.address);
    formData.append("lat", restaurant.location.lat);
    formData.append("lng", restaurant.location.lng);

    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const response = await axios.put(
        `${url}/api/restaurants/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Restaurant updated successfully!");
        navigate(`/restaurant/${id}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during restaurant update:", error);
      toast.error("Error updating restaurant.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!restaurant) return <p>Restaurant not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-3xl font-semibold text-center mb-6">
        Edit Restaurant
      </h3>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            value={restaurant.name}
            onChange={(e) =>
              setRestaurant({ ...restaurant, name: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            value={restaurant.description}
            onChange={(e) =>
              setRestaurant({ ...restaurant, description: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Address:</label>
          <textarea
            value={restaurant.address}
            onChange={(e) =>
              setRestaurant({ ...restaurant, address: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Longitude:</label>
          <input
            type="number"
            value={restaurant.location.lng}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                location: { ...restaurant.location, lng: e.target.value },
              })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Latitude:</label>
          <input
            type="number"
            value={restaurant.location.lat}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                location: { ...restaurant.location, lat: e.target.value },
              })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Current Image Display */}
        <div className="mt-4">
          <label className="block font-semibold">Current Image:</label>
          {restaurant.image && (
            <img
              src={`${url}/images/restaurants/${restaurant.image}`}
              alt="Restaurant"
              className="w-48 h-48 object-cover mb-4"
            />
          )}
        </div>

        {/* Image Upload Area */}
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition">
          <input
            onChange={(e) => setNewImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
          />
          <label htmlFor="image" className="flex flex-col items-center">
            <img
              className="w-28"
              src={
                newImage ? URL.createObjectURL(newImage) : assets?.upload_area
              }
              alt="Upload Area"
            />
            <span className="text-gray-500 mt-2">
              {newImage ? newImage.name : "Click to upload an image"}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Update Restaurant
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
