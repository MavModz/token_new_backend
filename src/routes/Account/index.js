import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";

const Account = ({ onLogout }) => {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const authToken = localStorage.getItem("auth_token");

  // Show toast message on successful login
  useEffect(() => {
    if (authToken) {
      addToast("Login successful!", { appearance: "success" });
    }
  }, [authToken, addToast]);

  return authToken ? (
    <>
      <Header onLogout={onLogout} />
      <Sidebar />
      <Outlet />
    </>
  ) : (
    navigate("/login") // Redirect to login page if not authenticated
  );
};

export default Account;
