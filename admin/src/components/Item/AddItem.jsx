import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddItem = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    restaurant: "",
  });
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  // Fetch categories and restaurants on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
          if (response.data.data.length > 0) {
            setData((prevData) => ({
              ...prevData,
              category: response.data.data[0].name,
            }));
          }
        } else {
          toast.error("Failed to load Categories.");
        }
      } catch (error) {
        toast.error("Error fetching Categories.");
      }
    };

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants`);
        if (response.data.success) {
          setRestaurants(response.data.data);
          if (response.data.data.length > 0) {
            setData((prevData) => ({
              ...prevData,
              restaurant: response.data.data[0].name,
            }));
          }
        } else {
          toast.error("Failed to load Restaurants.");
        }
      } catch (error) {
        toast.error("Error fetching Restaurants.");
      }
    };

    fetchCategories();
    fetchRestaurants();
  }, [url]);

  // Handle form data updates
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form data
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("restaurant", data.restaurant);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: categories.length > 0 ? categories[0].name : "",
          restaurant: restaurants.length > 0 ? restaurants[0].name : "",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
    }
  };
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">
        Add New Product
      </h2>
      <form
        onSubmit={onSubmitHandler}
        className="space-y-6 bg-white shadow-lg p-8 rounded-lg border"
      >
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Upload Image
          </label>
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 sm:p-8 rounded-xl cursor-pointer hover:bg-gray-200 transition">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              required
            />
            <label htmlFor="image" className="flex flex-col items-center">
              <img
                className="w-24 sm:w-28"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Area"
              />
              <span className="text-gray-500 mt-2">
                {image ? image.name : "Click to upload an image"}
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            className="w-full p-3 border rounded-md"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Product Description
          </label>
          <textarea
            className="w-full p-3 border rounded-md"
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="restaurant"
              className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
            >
              Product Restaurant
            </label>
            <select
              onChange={onChangeHandler}
              className="w-full p-3 border rounded-md"
              name="restaurant"
              value={data.restaurant}
              required
            >
              {restaurants.map((restaurant, index) => (
                <option key={index} value={restaurant.name}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="category"
              className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
            >
              Product Category
            </label>
            <select
              onChange={onChangeHandler}
              className="w-full p-3 border rounded-md"
              name="category"
              value={data.category}
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-1/2">
          <label
            htmlFor="price"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2"
          >
            Product Price
          </label>
          <input
            className="w-full p-3 border rounded-md"
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            placeholder="Rs.100"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-blue-500 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddItem;
