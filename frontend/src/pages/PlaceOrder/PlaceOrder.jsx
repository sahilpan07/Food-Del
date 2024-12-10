import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Formik, Form, Field } from "formik";
import { assets } from "../../assets/assets";

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
  const [loading, setLoading] = useState(false);
  const [animationClass, setAnimationClass] = useState("fadeIn");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    location: "",
  };

  const placeOrder = async (values) => {
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
      address: values,
      items: orderItems,
      amount: getTotalCartAmount() + 150,
      paymentGateway: values.payemntOption,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    setLoading(false);
    if (response.data.success) {
      const { session_url } = response.data;
      if (values.payemntOption === "stripe") {
        // Redirect to Stripe payment gateway
        window.location.replace(session_url);
      } else {
        toast.error("Selected payment gateway is not implemented yet.");
      }
    } else {
      toast.error("Failed to place order");
    }
  };

  const LocationMarker = ({ setFieldValue }) => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
          );
          const address = response.data.address;

          setFieldValue("street", address.road || "");
          setFieldValue("city", address.city || "");
          setFieldValue("state", address.state || "");
          setFieldValue("country", address.country || "");
          setFieldValue(
            "location",
            `${address.road || ""}, ${address.suburb || ""}, ${
              address.city || ""
            }, ${address.state || ""}, ${address.country || ""}`.trim()
          );
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
    <Formik initialValues={initialValues} onSubmit={placeOrder}>
      {({ values, handleChange, setFieldValue }) => (
        <Form className="flex flex-col md:flex-row gap-8 mt-12 mx-12 md:mx-20">
          {/* Delivery Information Section */}
          <div
            className={`w-full md:w-2/3 bg-white p-6 rounded-lg shadow-xl ${animationClass}`}
          >
            <p className="text-2xl font-semibold mb-6 text-gray-800">
              Delivery Information
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <Field
                  required
                  name="firstName"
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
                <Field
                  required
                  name="lastName"
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
                <Field
                  required
                  name="email"
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
                <Field
                  required
                  name="phone"
                  className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
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
              <label className="block text-gray-700">
                Select Location on Map
              </label>
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
                <LocationMarker setFieldValue={setFieldValue} />
              </MapContainer>
              {selectedLocation && (
                <p className="text-gray-600 mt-2">
                  Selected Location: <br />
                  {values.location && (
                    <span className="mt-2">Address: {values.location}</span>
                  )}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="relative">
                <Field
                  required
                  name="country"
                  className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Country"
                />
              </div>
              <div className="relative">
                <Field
                  required
                  name="state"
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
                <Field
                  required
                  name="city"
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
                <Field
                  required
                  name="street"
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
          <div className="w-full md:w-1/3 flex flex-col gap-10">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <p className="text-lg text-gray-800 font-medium mb-4">
                Cart Summary
              </p>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Subtotal:</span>
                <span>${getTotalCartAmount()}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Delivery Fee:</span>
                <span>$150</span>
              </div>
              <div className="flex justify-between text-gray-800 text-lg font-semibold border-t pt-4">
                <span>Total:</span>
                <span>${getTotalCartAmount() + 150}</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Payment Option
              </label>
              <div className="flex gap-4">
                <label className="flex items-center text-sm space-x-2">
                  <Field
                    type="radio"
                    name="payemntOption"
                    value="stripe"
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-700 flex items-center space-x-2">
                    <img
                      src={assets.stripe}
                      alt="Stripe"
                      className="h-4 w-4 sm:h-6 sm:w-6 object-contain max-w-full flex-shrink-0"
                    />
                    <span>Stripe</span>
                  </span>
                </label>
                <label className="flex items-center text-sm space-x-2">
                  <Field
                    type="radio"
                    name="payemntOption"
                    value="esewa"
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700 flex items-center space-x-2">
                    <img
                      src={assets.esewa}
                      alt="Esewa"
                      className="h-4 w-4 sm:h-6 sm:w-6 object-contain max-w-full flex-shrink-0"
                    />
                    <span>Esewa</span>
                  </span>
                </label>
                <label className="flex items-center text-sm space-x-2">
                  <Field
                    type="radio"
                    name="payemntOption"
                    value="khalti"
                    className="h-4 w-4 text-yellow-600"
                  />
                  <span className="text-gray-700 flex items-center space-x-2">
                    <img
                      src={assets.khalti}
                      alt="Khalti"
                      className="h-4 w-4 sm:h-6 sm:w-6 object-contain max-w-full flex-shrink-0"
                    />
                    <span>Khalti</span>
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              } w-full py-3 text-white font-semibold rounded-lg transition duration-300`}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PlaceOrder;
