import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = "http://localhost:4000";

  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);

  const [categories, setCategories] = useState([]);

  const [restaurants, setRestaurants] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    //from backend
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    //from backend
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  //fetch food list forn database
  const fetchFoodList = async () => {
    //call api
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  // New sendEmail function
  const sendEmail = async (formData) => {
    if (!token) {
      throw new Error("No token found. User is not authorized.");
    }
    const response = await axios.post(
      url + "/api/contact/send-email",
      formData,
      {
        headers: { token },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Error sending email");
    }
    return response.data;
  };

  const registerRestaurant = async (formData) => {
    if (!token) {
      throw new Error("No token found. User is not authorized.");
    }
    const response = await axios.post(
      url + "/api/registration/restaurant-registration",
      formData,
      {
        headers: { token },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Error sending email");
    }
    return response.data;
  };
  const registerRider = async (formData) => {
    if (!token) {
      throw new Error("No token found. User is not authorized.");
    }
    const response = await axios.post(
      url + "/api/registration/riders-registration",
      formData,
      {
        headers: { token },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Error sending email");
    }
    return response.data;
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(url + "/api/categories");
      if (response.data.success) {
        setCategories(response.data.data); // Assuming response.data.data contains the category array
      } else {
        console.error("Failed to fetch categories:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(url + "/api/restaurants");
      if (response.data.success) {
        setRestaurants(response.data.data); // Assuming response.data.data contains the category array
      } else {
        console.error("Failed to fetch Restaurants:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching Restaurants:", error);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        `${url}/api/restaurants/search?query=${query}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  };

  //protect from logout when reload page
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await fetchCategories();
      await fetchRestaurants();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    categories,
    restaurants,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    sendEmail,
    registerRestaurant,
    registerRider,
    fetchSearchResults,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
