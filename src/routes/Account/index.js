import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import "./index.css";
import { useSelector } from "react-redux";

const Account = ({ onLogout }) => {
  const { addToast } = useToasts();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("auth_token");
  const [loginToastShown, setLoginToastShown] = useState(false);

  const initialRenderRef = useRef(true); // Track the initial render

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
    } else {
      !authToken && navigate("/login", { replace: true });
      if (authToken && !loginToastShown) {
        setLoginToastShown(true);
      }
    }
  }, [authToken, navigate, addToast, loginToastShown]);

  return authToken ? (
    <>
      <Header onLogout={onLogout} />
      <Sidebar />
      <div className={isOpen ? "main-content" : "main-content-hide"}>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    navigate("/login") // Redirect to login page if not authenticated
  );
};

export default Account;
