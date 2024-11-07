import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access the route params

const RestaurantDetail = ({ url }) => {
  const { id } = useParams(); // Get the restaurant ID from the URL params
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants/${id}`);
        if (response.data.success) {
          setRestaurant(response.data.data);
        } else {
          // Handle if restaurant is not found
          alert("Restaurant not found");
        }
      } catch (error) {
        console.error("Error fetching restaurant details", error);
      }
    };

    fetchRestaurantDetails();
  }, [id, url]); // Fetch details when the component mounts or when `id` changes

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-3xl font-semibold text-center mb-6">Restaurant Details</h3>
      
      <div className="space-y-4">
        <div>
          <strong>Name:</strong> {restaurant.name}
        </div>
        <div>
          <strong>Description:</strong> {restaurant.description}
        </div>
        <div>
          <strong>Address:</strong> {restaurant.address}
        </div>
        <div>
          <strong>Latitude:</strong> {restaurant.location.lat}
        </div>
        <div>
          <strong>Longitude:</strong> {restaurant.location.lng}
        </div>
        <div>
          <strong>Image:</strong>
          <img
            src={`${url}/images/${restaurant.image}`}
            className="mt-4 w-48 h-48 object-cover rounded-lg"
            alt={restaurant.name}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
