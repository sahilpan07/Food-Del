import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Aboutus from "./pages/Aboutus/Aboutus";
import Menu from "./pages/Menu/Menu";
import Restaurant from "./pages/Restaurant/Restaurant";
import ContactUs from "./pages/ContactUs/ContactUs";
import ExploreRestaurant from "./components/ExploreRestaurant/ExploreRestaurant";
import FAQ from "./components/aboutUsComponents/FAQ";
import Partner from "./components/aboutUsComponents/Partner";
import HelpSupport from "./components/aboutUsComponents/HelpSupport";
import CompanyDetail from "./components/aboutUsComponents/CompanyDetail";

const App = () => {
  window.onload = function () {
    window.scrollTo(0, 0);
  };
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <div className="sticky top-0 z-50 bg-white shadow">
          <Navbar setShowLogin={setShowLogin} />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/explore-res" element={<ExploreRestaurant/>}/>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/aboutUs" element={<Aboutus />} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="company" element={<CompanyDetail/>}/>
          <Route path="/about" element={<Partner/>}/>
          <Route path="/Help" element={<HelpSupport/>}/>
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
