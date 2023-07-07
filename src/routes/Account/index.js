import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const Account = () => {
  const auth = localStorage.getItem("auth_token");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default Account;
