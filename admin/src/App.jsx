import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFood from "./pages/AddFood/AddFood";
import AddCategory from "./components/Category/AddCategory";
import AddRestaurant from "./components/Restaurant/AddRestaurant";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";
import ListRestaurant from "./components/Restaurant/ListRestaurant";
import RestaurantDetail from "./components/Restaurant/RestaurantDetail";
import EditRestaurant from "./components/Restaurant/EditRestaurant";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ListCategory from "./components/Category/ListCategory";
import EditCategory from "./components/Category/EditCategory";

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
          <Route path="/category" element={<CategoryPage url={url} />} />
          <Route path="/addrestaurant" element={<AddRestaurant url={url} />} />
          <Route
            path="/listRestaurant"
            element={<ListRestaurant url={url} />}
          />
          <Route
            path="/restaurant/:id"
            element={<RestaurantDetail url={url} />}
          />
          <Route
            path="/editrestaurant/:id"
            element={<EditRestaurant url={url} />}
          />
          <Route path="listCategory" element={<ListCategory url={url} />} />
          <Route path="editCategory/:id" element={<EditCategory url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
