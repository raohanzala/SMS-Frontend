import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import React from "react";

// Component for wrapping individual public routes
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useSelector((state: RootState) => state?.auth);

  if (token && user) {
    switch (user.role) {
      case "super_admin":
        return <Navigate to="/super-admin/dashboard" replace />;
      case "school_owner":
        return <Navigate to="/owner/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "teacher":
        return <Navigate to="/teacher/dashboard" replace />;
      case "student":
        return <Navigate to="/student/dashboard" replace />;
      case "parent":
        return <Navigate to="/parent/dashboard" replace />;
      case "staff":
        return <Navigate to="/staff/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

// Component for public route layout (uses Outlet)
const PublicRoutes = () => {
  const { user, token } = useSelector((state: RootState) => state?.auth);

  if (token && user) {
    switch (user.role) {
      case "super_admin":
        return <Navigate to="/super-admin/dashboard" replace />;
      case "school_owner":
        return <Navigate to="/owner/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "teacher":
        return <Navigate to="/teacher/dashboard" replace />;
      case "student":
        return <Navigate to="/student/dashboard" replace />;
      case "parent":
        return <Navigate to="/parent/dashboard" replace />;
      case "staff":
        return <Navigate to="/staff/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoutes;
