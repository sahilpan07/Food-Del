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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <ToastContainer /> {/* Ensure ToastContainer is included */}
      <form
        onSubmit={onLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md box-border relative transition-transform transform hover:scale-105"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{currState}</h2>
          <Icon
            onClick={() => setShowLogin(false)}
            className="cursor-pointer w-6 h-6 text-gray-600 hover:text-red-500 transition-colors"
            icon="mingcute:close-line"
          />
        </div>
        <div className="flex flex-col gap-4 mb-4">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
              className="border-2 border-gray-300 bg-gray-100 p-3 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="border-2 border-gray-300 bg-gray-100 p-3 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
            className="border-2 border-gray-300 bg-gray-100 p-3 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-md text-white bg-blue-600 text-lg font-semibold hover:bg-blue-700 transition duration-200 mb-4"
        >
          {currState === "Sign Up" ? "Create an Account" : "Login"}
        </button>
        <div className="flex items-center mb-4">
          <input type="checkbox" required className="mr-2" />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the terms of use & privacy policy
          </p>
        </div>
        {currState === "Login" ? (
          <p className="text-sm text-gray-600">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
