import React from "react";
import { Outlet } from "react-router-dom"; 

//Added Outlet to render nested routes 
function MainLayout(){
  return(
    <div>
      <h1>MainLayout Page</h1>
      <Outlet /> 
    </div>
  );
}

export default MainLayout;