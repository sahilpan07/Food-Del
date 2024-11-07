import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFood from "./pages/AddFood/AddFood";
import AddCategory from "./pages/AddCategory/AddCategory";
//import AddRestaurant from "./pages/AddRestaurant/AddRestaurant";
import AddRestaurant from "./components/Restaurant/AddRestaurant";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";
import ListRestaurant from "./components/Restaurant/ListRestaurant";
import RestaurantDetail from "./components/Restaurant/RestaurantDetail";

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddFood url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/addcategory" element={<AddCategory url={url} />} />
          <Route path="/restaurant" element={<RestaurantPage url={url} />} />
          <Route path="/addrestaurant" element={<AddRestaurant url={url} />} />
          <Route path="/listRestaurant" element={<ListRestaurant url={url} />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail url={url} />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
