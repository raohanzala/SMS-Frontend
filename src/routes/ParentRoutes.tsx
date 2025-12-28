import { Routes, Route } from "react-router-dom";
import { ParentNav } from "@/utils/navigationConfig";
import ParentDashboard from "@/features/dashboard/parent/pages/ParentDashboard";
import ParentAttendancePage from "@/features/attendance/pages/ParentAttendancePage";
import Layout from "@/components/layout/Layout";

const ParentRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={ParentNav} />}>
      <Route index element={<ParentDashboard />} />
      <Route path="attendance" element={<ParentAttendancePage />} />
    </Route>
  </Routes>
);

export default ParentRoutes;
