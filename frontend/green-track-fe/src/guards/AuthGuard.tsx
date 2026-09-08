import { useAuth } from "@/services/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
