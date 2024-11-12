import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RiderValSchema from "../../validationSchema/RidersValidation";

// Custom marker icon to fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const RidersRegistration = () => {
  const { registerRider } = useContext(StoreContext);
  const [isSent, setIsSent] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialValues = {
    rider_name: "",
    email: "",
    phone: "",
    address: "",
    vehicle_type: "", // Optional field for vehicle
    vehicle_number: "", // Optional field for vehicle number
    description: "",
    location: "", // Coordinates selected from the map
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!selectedLocation) {
      toast.error("Please select a location on the map.");
      return;
    }

    try {
      const locationString = `${selectedLocation.lat},${selectedLocation.lng}`;
      // Add location string to values before sending
      const formValues = { ...values, location: locationString };

      const data = await registerRider(formValues);
      toast.success(data.message);
      setIsSent(true);
    } catch (error) {
      toast.error(error.message || "Error sending registration");
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
          Register as a Rider
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={RiderValSchema} // Make sure this schema is defined
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label htmlFor="rider_name" className="block text-gray-700">
                    Full Name
                  </label>
                  <Field
                    id="rider_name"
                    type="text"
                    name="rider_name"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="rider_name"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mb-4 w-full">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <Field
                    id="email"
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
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label htmlFor="phone" className="block text-gray-700">
                    Phone Number
                  </label>
                  <Field
                    id="phone"
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

                <div className="mb-4 w-full">
                  <label htmlFor="address" className="block text-gray-700">
                    Address (Eg:Kathmandu, Nepal)
                  </label>
                  <Field
                    id="address"
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

              <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                <div className="mb-4 w-full">
                  <label htmlFor="vehicle_type" className="block text-gray-700">
                    Vehicle Type (Optional)
                  </label>
                  <Field
                    id="vehicle_type"
                    type="text"
                    name="vehicle_type"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="vehicle_type"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mb-4 w-full">
                  <label
                    htmlFor="vehicle_number"
                    className="block text-gray-700"
                  >
                    Vehicle Number (Optional)
                  </label>
                  <Field
                    id="vehicle_number"
                    type="text"
                    name="vehicle_number"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="vehicle_number"
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
                  id="description"
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

              <div>
                <label className="block text-gray-700">
                  Select Your Location
                </label>
                <MapContainer
                  center={[27.7172, 85.324]} // Kathmandu, Nepal
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
                    Latitude {selectedLocation.lat}, Longitude{" "}
                    {selectedLocation.lng}
                  </p>
                )}
                <Field
                  id="location"
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
                {isSubmitting
                  ? "Sending..."
                  : isSent
                  ? "Sent"
                  : "Send Registration Form"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RidersRegistration;
