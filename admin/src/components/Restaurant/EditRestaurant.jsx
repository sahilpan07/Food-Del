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

    const formData = new FormData();
    formData.append("name", restaurant.name);
    formData.append("ownerName", restaurant.ownerName);
    formData.append("email", restaurant.email);
    formData.append("phone", restaurant.phone);
    formData.append("liscense", restaurant.liscense);
    formData.append("tax", restaurant.tax);
    formData.append("type", restaurant.type);
    formData.append("time", restaurant.time);
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
        navigate(`/restaurant/restaurant/${id}`);
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
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Edit Restaurant
      </h2>
      <form
        onSubmit={handleUpdate}
        className="space-y-6 bg-white shadow-lg p-8 rounded-lg border"
      >
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            value={restaurant.name}
            onChange={(e) =>
              setRestaurant({ ...restaurant, name: e.target.value })
            }
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Owner's Name
          </label>
          <input
            type="text"
            value={restaurant.ownerName}
            onChange={(e) =>
              setRestaurant({ ...restaurant, ownerName: e.target.value })
            }
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={restaurant.email}
              onChange={(e) =>
                setRestaurant({ ...restaurant, email: e.target.value })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={restaurant.phone}
              onChange={(e) =>
                setRestaurant({ ...restaurant, phone: e.target.value })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              License/Registration Number
            </label>
            <input
              type="text"
              value={restaurant.liscense}
              onChange={(e) =>
                setRestaurant({ ...restaurant, liscense: e.target.value })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Tax ID
            </label>
            <input
              type="text"
              value={restaurant.tax}
              onChange={(e) =>
                setRestaurant({ ...restaurant, tax: e.target.value })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Restaurant Type
            </label>
            <input
              type="text"
              value={restaurant.type}
              onChange={(e) =>
                setRestaurant({ ...restaurant, type: e.target.value })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Operational Hours
            </label>
            <input
              type="text"
              value={restaurant.time}
              onChange={(e) =>
                setRestaurant({ ...restaurant, time: e.target.value })
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
            value={restaurant.description}
            onChange={(e) =>
              setRestaurant({ ...restaurant, description: e.target.value })
            }
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={restaurant.address}
            onChange={(e) =>
              setRestaurant({ ...restaurant, address: e.target.value })
            }
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              value={restaurant.location.lng}
              onChange={(e) =>
                setRestaurant({
                  ...restaurant,
                  location: { ...restaurant.location, lng: e.target.value },
                })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              value={restaurant.location.lat}
              onChange={(e) =>
                setRestaurant({
                  ...restaurant,
                  location: { ...restaurant.location, lat: e.target.value },
                })
              }
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Current Image
            </label>
            {restaurant.image && (
              <img
                src={`${url}/images/restaurants/${restaurant.image}`}
                alt="Restaurant"
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
          Update Restaurant
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
