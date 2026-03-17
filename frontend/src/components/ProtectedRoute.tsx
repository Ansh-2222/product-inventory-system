// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children }: any) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;