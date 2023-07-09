import React, { useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { useSelector } from "react-redux";
import Account from "./routes/Account";
import Dashboard from "./routes/Dashborad";
import Calendar from "./routes/Calendar";
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";

function App() {
  const fetching = useSelector((state) => state.fetching);
  const authToken = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  useEffect(() => {
    if (authToken) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [authToken]);

  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      {fetching && <LoadingOverlay show={fetching} />}
      {/* <Routes>
        <Route
          path="/"
          element={
            authToken ? (
              <Navigate to="/account/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/account/*" element={<Account onLogout={handleLogout} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="/login" element={<Login onLogout={handleLogout} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<Account onLogout={handleLogout} />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="login" element={<Login onLogout={handleLogout} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
