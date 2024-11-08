// CategoryWrapper.jsx

import React from "react";
import { Outlet } from "react-router-dom";

const CategoryWrapper = () => {
  return (
    <div className="container p-4">
      {/* Render Outlet only if on a specific route */}
      <Outlet />
    </div>
  );
};

export default CategoryWrapper;
