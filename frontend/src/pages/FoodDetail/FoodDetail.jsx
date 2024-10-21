import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const FoodDetail = () => {
  const location = useLocation();
  const { id, name, price, description, image, restaurant } = location.state;
  const { url } = useContext(StoreContext);

  return (
    <div className="food-detail-container mx-20 mt-10">
      <h1>{restaurant}</h1>
      <h1 className="text-2xl font-bold">{name}</h1>
      <img src={`${url}/images/${image}`} alt="" className="rounded-lg" />
      <p className="text-lg">Price: Rs {price}</p>
      <p className="text-md">{description}</p>
    </div>
  );
};

export default FoodDetail;
