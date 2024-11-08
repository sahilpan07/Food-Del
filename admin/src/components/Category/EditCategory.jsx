import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const EditCategory = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/categories/${id}`);
        if (response.data.success) {
          setCategory(response.data.data);
        } else {
          toast.error("Failed to load category details.");
        }
      } catch (error) {
        toast.error("Error fetching category details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryDetails();
  }, [id, url]);

  const handleUpdate = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("name", category.name);

    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const response = await axios.put(
        `${url}/api/categories/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Category updated successfully!");
        navigate(`/category/listcategory`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during category update:", error);
      toast.error("Error updating category.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!category) return <p>Category not found.</p>;

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-2xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Edit Category
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            placeholder="Enter category name"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Current Image Display */}
          <div className="flex flex-col items-center shadow-lg border border-gray-300 rounded-lg p-4">
            <label className="block font-semibold text-gray-700 mb-2">Current Image:</label>
            {category.image && (
              <img
                src={`${url}/images/categories/${category.image}`}
                alt="Category"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          {/* Image Upload Area */}
          <div className="flex flex-col items-center shadow-lg border border-gray-300 rounded-lg p-4">
            <label className="block font-semibold text-gray-700 mb-2">New Image:</label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-8 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
              <input
                onChange={(e) => setNewImage(e.target.files[0])}
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="image" className="flex flex-col items-center">
                <img
                  className="w-32 h-32 object-cover rounded-lg shadow-sm"
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
        </div>

        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
  