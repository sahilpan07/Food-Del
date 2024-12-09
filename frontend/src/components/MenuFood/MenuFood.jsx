import React, { useState } from "react";
import ExploreMenu from "../ExploreMenu/ExploreMenu";
import FoodDisplay from "../FoodDisplay/FoodDisplay";

const MenuFood = () => {
  const [category, setCategory] = useState("All"); // Default category is "All"

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default MenuFood;
