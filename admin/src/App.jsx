import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategory from "./components/Category/AddCategory";
import AddRestaurant from "./components/Restaurant/AddRestaurant";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";
import ListRestaurant from "./components/Restaurant/ListRestaurant";
import RestaurantDetail from "./components/Restaurant/RestaurantDetail";
import EditRestaurant from "./components/Restaurant/EditRestaurant";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ListCategory from "./components/Category/ListCategory";
import EditCategory from "./components/Category/EditCategory";
import AddItem from "./components/Item/AddItem";
import ItemList from "./components/Item/ItemList";
import ItemPage from "./pages/ItemPage/ItemPage";
import ItemDetail from "./components/Item/ItemDetail";
import CategoryDetail from "./components/Category/CategoryDetail";
import EditfoodItem from "./components/Item/EditItem";
import HomePage from "./pages/HomePage/HomePage";
import OrderPage from "./pages/Orders/OrderPage";
import OrderList from "./components/Order/OrderList";

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
          <Route path="/" element={<HomePage url={url} />} />
          {/* Nested Category Routes */}
          <Route path="/restaurant" element={<RestaurantPage url={url} />}>
            <Route path="addrestaurant" element={<AddRestaurant url={url} />} />
            <Route path="listRestaurant" element={<ListRestaurant url={url} />} />
            <Route path="restaurant/:id" element={<RestaurantDetail url={url} />} />
            <Route path="editrestaurant/:id" element={<EditRestaurant url={url} />} />
          </Route>
          <Route path="/category" element={<CategoryPage url={url} />}>
            <Route path="addCategory" element={<AddCategory url={url} />} />
            <Route path="listCategory" element={<ListCategory url={url} />} />
            <Route path="categoryDetail/:id" element={<CategoryDetail url={url} />} />
            <Route path="editCategory/:id" element={<EditCategory url={url} />}/>
          </Route>
          <Route path="/item" element={<ItemPage url={url} />}>
            <Route path="addItem" element={<AddItem url={url} />} />
            <Route path="itemList" element={<ItemList url={url} />} />
            <Route path="list/:id" element={<ItemDetail url={url} />} />
            <Route path="editFood/:id" element={<EditfoodItem url={url} />} />
          </Route>
          <Route path="/orderPage" element={<OrderPage url={url} />}>
            <Route path="onProcess" element={<OrderList url={url} status="On Process" />}/>
            <Route path="foodProcessing" element={<OrderList url={url} status="Food Processing" />}/>
            <Route path="outForDelivery" element={<OrderList url={url} status="Out for Delivery" />}/>
            <Route path="delivered" element={<OrderList url={url} status="Delivered" />}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
