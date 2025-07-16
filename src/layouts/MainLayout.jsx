import React from "react";
import { Outlet } from "react-router-dom"; // Added Outlet import

function MainLayout(){
  return(
    <div>
      <h1>MainLayout Page</h1>
      <Outlet /> {/* Added Outlet to render nested routes */}
    </div>
  );
}

export default MainLayout;