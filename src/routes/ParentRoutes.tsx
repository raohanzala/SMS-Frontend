import { Routes, Route } from "react-router-dom";
import { ParentNav } from "@/utils/navigationConfig";
import Layout from "@/components/layout/Layout";
import ParentDashboard from "@/features/dashboard/parent/pages/ParentDashboard";
import ParentAttendancePage from "@/features/attendance/pages/ParentAttendancePage";
import ParentResultsPage from "@/features/exams/pages/ParentResultsPage";
import ParentFeesPage from "@/features/fees/pages/ParentFeesPage";

const ParentRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={ParentNav} />}>
      <Route index path="dashboard" element={<ParentDashboard />} />
      
      {/* Attendance */}
      <Route path="attendance" element={<ParentAttendancePage />} />
      
      {/* Results */}
      <Route path="results" element={<ParentResultsPage />} />
      
      {/* Fees */}
      <Route path="fees" element={<ParentFeesPage />} />
      
      {/* TODO: Implement these pages */}
      {/* <Route path="child/:childId" element={<ChildProfilePage />} /> */}
      {/* <Route path="leaves" element={<ParentLeaveRequestsPage />} /> */}
    </Route>
  </Routes>
);

export default ParentRoutes;
