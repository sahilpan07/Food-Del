import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    phoneNumber: "", 
    address: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (currState === "Login") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
          toast.success("Successfully logged in!");
        } else {
          toast.success("Successfully registered! Please log in.");
          setData({
            name: "",
            phoneNumber: "",
            address: "",
            email: "",
            password: "",
          });
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <ToastContainer />
      <form
        onSubmit={onLogin}
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg box-border relative transition-transform transform hover:scale-105"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold text-gray-800">{currState}</h2>
          <Icon
            onClick={() => setShowLogin(false)}
            className="cursor-pointer w-8 h-8 text-gray-500 hover:text-red-500 transition-colors"
            icon="mingcute:close-line"
          />
        </div>
        <div className="flex flex-col gap-5 mb-4">
          {currState === "Sign Up" && (
            <>
              <input
              id="name"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Full Name"
                required
                className="border border-gray-300 bg-gray-100 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-200"
              />
              <input
              id="phoneNumber"
                name="phoneNumber"
                onChange={onChangeHandler}
                value={data.phoneNumber}
                type="tel"
                placeholder="Phone Number"
                required
                className="border border-gray-300 bg-gray-100 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-200"
              />
              <input
              id="address"
                name="address"
                onChange={onChangeHandler}
                value={data.address}
                type="text"
                placeholder="Address"
                required
                className="border border-gray-300 bg-gray-100 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-200"
              />
            </>
          )}
          <input
          id="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
            className="border border-gray-300 bg-gray-100 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-200"
          />
          <input
          id="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your Password"
            required
            className="border border-gray-300 bg-gray-100 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-200"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            required
            className="mr-2 h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the terms of use & privacy policy
          </p>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-semibold hover:from-indigo-500 hover:to-blue-600 transition duration-200 shadow-lg mb-4"
        >
          {currState === "Sign Up" ? "Create an Account" : "Login"}
        </button>

        {currState === "Login" ? (
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-blue-500 cursor-pointer font-semibold hover:underline"
            >
              Sign up here
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-blue-500 cursor-pointer font-semibold hover:underline"
            >
              Log in here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
