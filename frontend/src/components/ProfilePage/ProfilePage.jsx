import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "", // Add a field for password
  });

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage
        if (token) {
          const response = await axios.get(url + "/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            setFormData({
              fullName: response.data.user.name,
              email: response.data.user.email,
              phoneNumber: response.data.user.phoneNumber,
              address: response.data.user.address,
              password: "", // Reset password field to empty string for security
            });
          }
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        console.log(token);
        const updatedData = { ...formData };

        if (!formData.password) delete updatedData.password;

        const response = await axios.put(
          `${url}/api/user/update`,
          updatedData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Log response for debugging
        console.log("API Response:", response);

        if (response.data.success) {
          setIsEditing(false);
          console.log("User details updated:", formData);
        } else {
          console.log("Failed to update profile. Please try again later.");
        }
      }
    } catch (error) {
      console.log("Error saving user data:", error);
    }
  };

  return (
    <div className="py-10 mx-12 md:mx-20">
      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-cyan-700"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {formData.fullName}
          </h1>
          <p className="text-md text-gray-600">{formData.email}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 font-medium">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800">{formData.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800">{formData.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800">{formData.phoneNumber}</p>
            )}
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-gray-600 font-medium">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800">{formData.address}</p>
            )}
          </div>

          {isEditing && (
            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-gray-600 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4 justify-center sm:justify-start">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-cyan-700 text-white py-2 px-6 rounded-xl hover:bg-cyan-800 transition-all"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-cyan-700 text-white py-2 px-6 rounded-xl hover:bg-cyan-800 transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
