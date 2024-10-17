import React, { useState } from "react";
import MenuFood from "../../components/MenuFood/MenuFood";

const Menu = () => {


  return (
    <div className="mx-12 md:mx-20">
      <h1 className="text-gray-800 text-lg font-semibold">Explore Our Menu</h1>
      <p className="max-w-[60%] text-gray-600">
        Welcome to Delicious Bites Online Ordering! Explore our mouthwatering
        menu featuring a variety of appetizers, main courses, desserts, and
        beverages delivered right to your door.
      </p>
      <MenuFood/>
    </div>
  );
};

export default Menu;
