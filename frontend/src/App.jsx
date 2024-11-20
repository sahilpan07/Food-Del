import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Menu from "./pages/Menu/Menu";
import Restaurant from "./pages/Restaurant/Restaurant";
import ContactUs from "./pages/ContactUs/ContactUs";
import ExploreRestaurant from "./components/ExploreRestaurant/ExploreRestaurant";
import FAQ from "./components/aboutUsComponents/FAQ";
import HelpSupport from "./components/aboutUsComponents/HelpSupport";
import OrderStep from "./components/aboutUsComponents/OrderStep";
import AboutPage from "./pages/Aboutus/AboutPage";
import AboutUs from "./components/aboutUsComponents/AboutUs";
import { ToastContainer } from "react-toastify";
import FoodDetail from "./pages/FoodDetail/FoodDetail";
import RestaurantRegistration from "./pages/Registration/RestaurantRegistration";
import RidersRegistration from "./pages/Registration/RidersRegistration";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Settings from "./components/Settings/Settings";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import RecentFood from "./components/RecentFood/RecentFood";
import Chatbot from "./components/ChatBot/ChatBot";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from "./components/Atomic/ScrollToTop";

const App = () => {
  window.onload = function () {
    window.scrollTo(0, 0);
  };
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Chatbot/>
        <ScrollToTop/>
        <div className="sticky z-40 top-0 bg-white shadow">
          <ToastContainer />
          <Navbar setShowLogin={setShowLogin} />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/foodDetail" element={<FoodDetail />} />
          <Route path="/explore-res" element={<ExploreRestaurant />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/aboutpage" element={<AboutPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="/orderStep" element={<OrderStep />} />
          <Route path="/Help" element={<HelpSupport />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/recentFood" element={<RecentFood />} />
          <Route path="/chatbot" element={<Chatbot />} />
          
          <Route
            path="/RestaurantRegistration"
            element={<RestaurantRegistration />}
          />
          <Route path="/RidersRegistration" element={<RidersRegistration />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
