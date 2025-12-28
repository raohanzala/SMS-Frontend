import { Routes, Route } from "react-router-dom";
import { adminNav } from "@/utils/navigationConfig";
import SuperAdminDashboard from "@/features/dashboard/admin/pages/AdminDashboard";
import Layout from "@/components/layout/Layout";

const SuperAdminRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={adminNav} />}>
      <Route index element={<SuperAdminDashboard />} />
    </Route>
  </Routes>
);

export default SuperAdminRoutes;
