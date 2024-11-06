import React from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Restaurant = () => {
  const location = useLocation();
  const { id, name, description, image, address } = location.state;
  const { url } = useContext(StoreContext);


  return (
    <div className="mx-20">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <img src={`${url}/images/${image}`} alt="" className="w-48" />
          <p className="mt-2 text-lg">{address}</p>
          <p>{description}</p>
          <FoodDisplay restaurant={name} />
        </div>
    </div>
  );
};

export default Restaurant;
