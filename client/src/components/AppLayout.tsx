import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";

const AppLayout = () => {
  return (
    <div className="App">
      <SidebarComponent />
      <Outlet />
    </div>
  );
};

export default AppLayout;
