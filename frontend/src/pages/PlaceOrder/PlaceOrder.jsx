import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react"; // Importing Iconify component
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon to fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [animationClass, setAnimationClass] = useState("fadeIn");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading when placing the order
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 150,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    setLoading(false);
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Failed to place order");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });

        // Fetch detailed address information from OpenStreetMap's Nominatim API
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
          );
          const address = response.data.address;

          // Automatically fill form fields with the fetched location details
          setData((prevData) => ({
            ...prevData,
            street: address.road || "",
            city: address.city || "",
            state: address.state || "",
            country: address.country || "",
            location: `${address.road || ""}, ${address.suburb || ""}, ${
              address.city || ""
            }, ${address.state || ""}, ${address.country || ""}`.trim(),
          }));
        } catch (error) {
          console.error("Failed to fetch location details:", error);
        }
      },
    });

    return selectedLocation ? <Marker position={selectedLocation} /> : null;
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      toast.error("Your cart is Empty");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="flex flex-col md:flex-row gap-8 mt-12 mx-12 md:mx-20"
    >
      {/* Delivery Information Section */}
      <div
        className={`w-full md:w-2/3 bg-white p-6 rounded-lg shadow-xl ${animationClass}`}
      >
        <p className="text-2xl font-semibold mb-6 text-gray-800">
          Delivery Information
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
              type="text"
              placeholder="First Name"
            />
            <Icon
              icon="bi:person"
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>
          <div className="relative">
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
              type="text"
              placeholder="Last Name"
            />
            <Icon
              icon="bi:person"
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="relative">
            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
              type="text"
              placeholder="Email Address"
            />
            <Icon
              icon="bi:envelope"
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>

          <div className="relative">
            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              className="p-3  w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
              type="text"
              placeholder="Phone"
            />
            <Icon
              icon="bi:telephone"
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>
        </div>
        <div className="py-6">
          <label className="block text-gray-700">Select Location on Map</label>
          <MapContainer
            center={[27.7172, 85.324]} // Default to Kathmandu, Nepal
            zoom={13}
            style={{ height: "350px", width: "100%" }}
            className="rounded shadow"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
          {selectedLocation && (
            <p className="text-gray-600 mt-2">
              Selected Location: <br />
              {data.location && (
                <span className="mt-2">Address: {data.location}</span>
              )}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="relative">
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Country"
            />
          </div>
          <div className="relative">
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
              type="text"
              placeholder="State"
            />
            <Icon
              icon="bi:map"
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="relative">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
              type="text"
              placeholder="City"
            />
            <Icon
              icon="bi:map"
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>
          <div className="relative">
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
              type="text"
              placeholder="Street"
            />
            <Icon
              icon="bi:map"
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Cart Summary Section */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-xl">
        <p className="text-2xl font-semibold mb-6 text-gray-800">Cart Total</p>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-600">
            <p>SubTotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="flex justify-between text-gray-600">
            <p>Delivery Fee</p>
            <p>Rs.{getTotalCartAmount() === 0 ? 0 : 150}</p>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>
              Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 150}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-violet-900 text-white mt-6 py-3 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300 ${
            loading ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
          ) : (
            "PROCEED TO Payment"
          )}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
