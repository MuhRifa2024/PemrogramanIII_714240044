import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/auth";

export default function PrivateRoute() {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}