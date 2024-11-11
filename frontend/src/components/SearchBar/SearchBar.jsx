import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SearchBar = ({ setSearchOpen, setCategory }) => { // Add setCategory to props
    const [query, setQuery] = useState(""); // The search query
    const [results, setResults] = useState([]); // Search results
    const [restaurants, setRestaurants] = useState([]); // Define state for restaurants
    const [foodItems, setFoodItems] = useState([]); // Define state for food items
    const [categories, setCategories] = useState([]); // Define state for categories
    const [showResults, setShowResults] = useState(false); // Track visibility of search results
  
    const { url } = useContext(StoreContext);
    const navigate = useNavigate(); // Initialize useNavigate
  
    const handleSearch = async () => {
      if (query.trim()) {
        try {
          const response = await fetch(`${url}/api/search?query=${query}`);
          const data = await response.json();
  
          if (data.success) {
            setRestaurants(data.data.restaurants);
            setFoodItems(data.data.foodItems);
            setCategories(data.data.categories);
            setResults(data.data.restaurants.concat(data.data.foodItems, data.data.categories)); // Update results state
            setShowResults(true);
          } else {
            setResults([]);
            setShowResults(false);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          setShowResults(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    };
  
    const handleChange = (e) => {
      setQuery(e.target.value);
      handleSearch();
    };
  
    // Handle click on a restaurant to navigate to the restaurant detail page
    const handleRestaurantClick = (restaurant) => {
      navigate("/restaurant", {
        state: {
          id: restaurant._id,
          name: restaurant.name,
          description: restaurant.description,
          image: restaurant.image,
          address: restaurant.address,
        },
      });
      setShowResults(false); // Hide search results
      setSearchOpen(false); // Close search dropdown when restaurant is clicked
    };

    const handleCategoryClick = (categoryName) => {
        setCategory(categoryName);  // Update the category in state
        setShowResults(false);  // Hide search results
        setSearchOpen(false);   // Close search dropdown
        
        // Navigate to the menu page (assuming you want to navigate to a category-specific menu)
        navigate(`/menu`);  // Redirect to the menuFood page with categoryName as part of the URL
      };
      
  
    return (
      <div className="relative mx-4 sm:mx-6 lg:mx-20">
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search food, restaurants, or cuisines..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
        />
  
        {/* Clear Button */}
        {query && (
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200"
            onClick={() => setQuery("")}
          >
            <Icon icon="mdi:close" />
          </button>
        )}
  
        {/* Dropdown to show search results */}
        {results.length > 0 && (
          <div className="absolute left-0 right-0 top-full bg-white border border-gray-200 mt-2 rounded-lg shadow-lg z-10 max-h-[70vh] overflow-y-auto transition-all duration-200">
            {/* Displaying sections for restaurants, categories, and foods */}
            <div>
              <p className="px-4 py-2 text-lg font-semibold text-gray-800">Restaurants</p>
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                  onClick={() => handleRestaurantClick(restaurant)} // Add onClick to navigate
                >
                  <img
                    className="w-16 h-16 object-cover rounded-full mr-4"
                    src={`${url}/images/${restaurant.image}`}
                    alt={restaurant.name}
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800">{restaurant.name}</p>
                    <p className="text-sm text-gray-600">{restaurant.address}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div>
              <p className="px-4 py-2 text-lg font-semibold text-gray-800">Categories</p>
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                  onClick={() => handleCategoryClick(category.name)} // Call handleCategoryClick on category click

                >
                  <img
                    className="w-16 h-16 object-cover rounded-full mr-4"
                    src={`${url}/images/${category.image}`}
                    alt={category.name}
                  />
                  <div className="">
                    <p className="font-semibold text-gray-800">{category.name}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div>
              <p className="px-4 py-2 text-lg font-semibold text-gray-800">Food Items</p>
              {foodItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                >
                  <img
                    className="w-16 h-16 object-cover rounded-full mr-4"
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />
                  <div className="">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default SearchBar;
  