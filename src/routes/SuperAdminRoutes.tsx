import { Routes, Route } from "react-router-dom";
import { superAdminNav } from "@/utils/navigationConfig";
import SuperAdminDashboard from "@/features/dashboard/admin/pages/AdminDashboard";
import Layout from "@/components/layout/Layout";

const SuperAdminRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={superAdminNav} />}>
      <Route index path="dashboard" element={<SuperAdminDashboard />} />
      {/* TODO: Implement these pages */}
      {/* <Route path="schools" element={<SchoolsManagementPage />} /> */}
      {/* <Route path="owners" element={<SchoolOwnersPage />} /> */}
      {/* <Route path="subscriptions" element={<SubscriptionsPage />} /> */}
      {/* <Route path="logs" element={<SystemLogsPage />} /> */}
      {/* <Route path="settings" element={<SaaSSettingsPage />} /> */}
    </Route>
  </Routes>
);

export default SuperAdminRoutes;
