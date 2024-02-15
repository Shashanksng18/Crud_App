import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  return <>{user ? <Outlet /> : <Navigate to="/signup" />}</>;
};

export default PrivateRoute;
