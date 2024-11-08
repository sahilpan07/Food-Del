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
        navigate(`/category/${id}`);
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
    <div className="container mx-auto p-6">
      <h3 className="text-3xl font-semibold text-center mb-6">Edit Category</h3>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Current Image Display */}
        <div className="mt-4">
          <label className="block font-semibold">Current Image:</label>
          {category.image && (
            <img
              src={`${url}/images/categories/${category.image}`}
              alt="Category"
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
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
