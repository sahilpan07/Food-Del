import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

const Login = ({ setShowLogin }) => {

  const {url, setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login");
  //create state variable to save user detail
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //take data from input ans save in state variable
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  //for user login
  const onLogin = async (event) =>{
    event.preventDefault();
    //create instance of url to api call
    let newUrl  = url;
    if (currState==="Login") {
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    //call api
    const response = await axios.post(newUrl,data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <form onSubmit={onLogin} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md box-border relative transition-transform transform hover:scale-105">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="cursor-pointer w-6 h-6 text-gray-600 hover:text-red-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-4 mb-4">
          {currState === "Login" ? <></> : (
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
        <button type='submit' className="w-full py-3 rounded-md text-white bg-blue-600 text-lg font-semibold hover:bg-blue-700 transition duration-200 mb-4">
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
