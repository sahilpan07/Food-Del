import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFood from "./pages/AddFood/AddFood";

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
        </Routes>
      </div>
    </div>
  );
};

export default App;
