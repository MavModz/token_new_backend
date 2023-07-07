import React from "react";
import "./App.css";
import Login from "./routes/Login/index";
import { ToastProvider } from "react-toast-notifications";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { useSelector } from "react-redux";
import Account from "./routes/Account";
import Dashboard from "./routes/Dashborad";

function App() {
  const fetching = useSelector((state) => state.fetching);
  const authToken = localStorage.getItem("auth_token");

  const ProtectedRoute = ({ path, element }) => {
    return authToken ? element : <Navigate to="/" replace={true} />;
  };

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
      {fetching && <LoadingOverlay show={fetching} />}
      <Routes>
        <Route
          path="/"
          element={
            authToken ? <Navigate to="/account" replace={true} /> : <Login />
          }
        />
        <Route
          path="/account/*"
          element={<ProtectedRoute element={<Account />} />}
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
