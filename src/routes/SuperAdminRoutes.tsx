import { Routes, Route } from "react-router-dom";
import { superAdminNav } from "@/utils/navigationConfig";
import SuperAdminDashboard from "@/features/dashboard/admin/pages/AdminDashboard";
import Layout from "@/components/layout/Layout";
import SaaSSettingsPage from "@/features/saasSettings/pages/SaaSSettingsPage";
import PlansPage from "@/features/plans/pages/PlansPage";
import SuperAdminAuditLogsPage from "@/features/auditLogs/pages/SuperAdminAuditLogsPage";
import SchoolsPage from "@/features/schools/pages/SchoolsPage";
import SubscriptionsPage from "@/features/subscriptions/pages/SubscriptionsPage";
import SchoolOwnersPage from "@/features/schoolOwners/pages/SchoolOwnersPage";

const SuperAdminRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={superAdminNav} />}>
      <Route index path="dashboard" element={<SuperAdminDashboard />} />
      <Route path="settings" element={<SaaSSettingsPage />} />
      <Route path="plans" element={<PlansPage />} />
      <Route path="schools" element={<SchoolsPage />} />
      <Route path="subscriptions" element={<SubscriptionsPage />} />
      <Route path="owners" element={<SchoolOwnersPage />} />
      <Route path="audit-logs" element={<SuperAdminAuditLogsPage />} />
    </Route>
  </Routes>
);

export default SuperAdminRoutes;
