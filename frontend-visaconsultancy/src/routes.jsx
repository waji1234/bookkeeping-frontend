import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Applicants from "./pages/Applicants/ApplicantsList";
import Payments from "./pages/Payments/PaymentsList";
import Documents from "./pages/Documents/DocumentsList";
import Reports from "./pages/Reports/Reports";
import Users from "./pages/Users/UsersList";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="payments" element={<Payments />} />
        <Route path="documents" element={<Documents />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;