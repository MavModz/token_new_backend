import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { useSelector } from "react-redux";
import Account from "./routes/Account";
import Dashboard from "./routes/Dashborad";
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";
import ManageTeam from "./routes/ManageTeam";
import ProfileForm from "./routes/ProfileForm";
import InvoiceBalance from "./routes/InvoiceBalance";

function App() {
  const fetching = useSelector((state) => state.fetching);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      {fetching && <LoadingOverlay show={fetching} />}
      <Routes>
        <Route path="/" element={<Account onLogout={handleLogout} />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manageteam" element={<ManageTeam />} />
          <Route path="profileform" element={<ProfileForm />} />
          <Route path="invoicebalance" element={<InvoiceBalance />} />
        </Route>
        <Route path="login" element={<Login onLogout={handleLogout} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
