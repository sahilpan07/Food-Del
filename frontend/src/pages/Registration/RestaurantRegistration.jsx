import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const RestaurantRegistration = () => {
  const { registerRestaurant } = useContext(StoreContext);
  const [isSent, setIsSent] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialValues = {
    restaurant_name: "",
    owner_name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    description: "",
    license_number: "",
    tax_id: "",
    restaurant_type: "",
    operational_hours: "",
    website: "",
  };

  const validationSchema = Yup.object({
    restaurant_name: Yup.string().required("Required"),
    owner_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    license_number: Yup.string().required("Required"),
    tax_id: Yup.string().required("Required"),
    restaurant_type: Yup.string().required("Required"),
    operational_hours: Yup.string().required("Required"),
    website: Yup.string().url("Invalid URL"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!selectedLocation) {
      toast.error("Please select a location on the map.");
      return;
    }

    try {
      const locationString = `${selectedLocation.lat},${selectedLocation.lng}`;
      // Add location string to values before sending
      const formValues = { ...values, location: locationString };

      const data = await registerRestaurant(formValues);
      toast.success(data.message);
      setIsSent(true);
    } catch (error) {
      toast.error(error.message || "Error sending email");
    } finally {
      setSubmitting(false);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setSelectedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return selectedLocation ? <Marker position={selectedLocation} /> : null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-12 md:mx-20">
      <ToastContainer />
      <div className="flex flex-col gap-8 w-full p-6 bg-white rounded-lg shadow-md md:p-10">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Register Your Restaurant
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="restaurant_name"
                    className="block text-gray-700"
                  >
                    Restaurant Name
                  </label>
                  <Field
                    type="text"
                    name="restaurant_name"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="restaurant_name"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mb-4 w-full">
                  <label htmlFor="owner_name" className="block text-gray-700">
                    Owner's Name
                  </label>
                  <Field
                    type="text"
                    name="owner_name"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="owner_name"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mb-4 w-full">
                  <label htmlFor="phone" className="block text-gray-700">
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="license_number"
                    className="block text-gray-700"
                  >
                    License Number
                  </label>
                  <Field
                    type="text"
                    name="license_number"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="license_number"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="tax_id" className="block text-gray-700">
                    Tax ID
                  </label>
                  <Field
                    type="text"
                    name="tax_id"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="tax_id"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="restaurant_type"
                    className="block text-gray-700"
                  >
                    Restaurant Type
                  </label>
                  <Field
                    type="text"
                    name="restaurant_type"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="restaurant_type"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mb-4 w-full">
                  <label
                    htmlFor="operational_hours"
                    className="block text-gray-700"
                  >
                    Operational Hours
                  </label>
                  <Field
                    type="text"
                    name="operational_hours"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="operational_hours"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label htmlFor="website" className="block text-gray-700">
                    Website/Social Media Link
                  </label>
                  <Field
                    type="url"
                    name="website"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mb-4 w-full">
                  <label htmlFor="address" className="block text-gray-700">
                    Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700">
                  Select Location on Map
                </label>
                <MapContainer
                  center={[27.7172, 85.324]} // Kathmandu, Nepal
                  zoom={13}
                  style={{ height: "500px", width: "100%" }}
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
                    Latitude {selectedLocation.lat}, Longitude{" "}
                    {selectedLocation.lng}
                  </p>
                )}
                <Field
                  type="hidden"
                  name="location"
                  value={
                    selectedLocation
                      ? `${selectedLocation.lat},${selectedLocation.lng}`
                      : ""
                  }
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSent || !selectedLocation} // Disable if no location is selected
                className="w-56 p-2 py-2 bg-[#040A27] text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? "Sending..." : isSent ? "Sent" : "Send Registration Form"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RestaurantRegistration;
