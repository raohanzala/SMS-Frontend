import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRoles }) => {
  const { user } = useSelector((state : RootState) => state.auth);

  // if (!allowedRoles.includes(user?.role)) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
};

export default RoleGuard;
