import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddRestaurant = ({ url }) => {
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [liscense, setLiscense] = useState("");
  const [tax, setTax] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
 //const [docImage, setDocImage] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !ownerName || !email || !phone || !liscense || !tax || !type || !time || !description || !address || !lat || !lng || !image) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("ownerName", ownerName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("liscense", liscense);
    formData.append("tax", tax);
    formData.append("type", type);
    formData.append("time", time);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("image", image);
  
    try {
      const response = await axios.post(
        `${url}/api/restaurants/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.data.success) {
        toast.success("Restaurant added successfully!");
        setErrorMessage("");
        setName("");
        setOwnerName("");
        setEmail("");
        setPhone("");
        setLiscense("");
        setTax("");
        setType("");
        setTime("");
        setDescription("");
        setAddress("");
        setLat("");
        setLng("");
        setImage(null);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding restaurant.");
    }
  };
  

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Add a Restaurant
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg p-8 rounded-lg border"
      >
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Restaurant Name"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Owner Name
          </label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Owners's Name"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Phone Numeber
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(+977----------)"
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Liscense/Registration Numeber
            </label>
            <input
              type="text"
              value={liscense}
              onChange={(e) => setLiscense(e.target.value)}
              placeholder="Eg: 342332"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Tax Id
            </label>
            <input
              type="text"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="Eg: 325523"
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
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Eg: FastFood"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Operational hours
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Eg: 10Am-10Pm"
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description of the restaurant"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Eg: Kathmandu, Nepal"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Eg: 24.498573"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="Eg: 35.237645"
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-4">
{/*           <div className="flex flex-col w-full">
            <label
              htmlFor="docImage"
              className="text-lg font-medium text-gray-700 mb-2"
            >
              Registration Documents
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition">
              <input
                onChange={(e) => setDocImage(e.target.files[0])}
                type="file"
                id="docImage"
                className="hidden"
                accept="docImage/*"
              />
              <label htmlFor="docImage" className="flex flex-col items-center">
                <img
                  className="w-28"
                  src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
                  alt="Upload Area"
                />
                <span className="text-gray-500 mt-2">
                  {docImage ? docImage.name : "Click to upload an Document image"}
                </span>
              </label>
            </div>
          </div> */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="image"
              className="text-lg font-medium text-gray-700 mb-2"
            >
              Restaurant Image
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition">
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="image" className="flex flex-col items-center">
                <img
                  className="w-28"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="Upload Area"
                />
                <span className="text-gray-500 mt-2">
                  {image ? image.name : "Click to upload an image"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
