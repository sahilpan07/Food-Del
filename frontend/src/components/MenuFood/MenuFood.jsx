import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ExploreMenu from "../ExploreMenu/ExploreMenu";
import FoodDisplay from "../FoodDisplay/FoodDisplay";

const MenuFood = () => {
  const [category, setCategory] = useState("All"); // Default category is "All"
  const [searchOpen, setSearchOpen] = useState(false); // Search dropdown visibility

  return (
    <div>
      <SearchBar setCategory={setCategory} setSearchOpen={setSearchOpen} />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default MenuFood;
