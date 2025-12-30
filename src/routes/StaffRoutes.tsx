import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { staffNav } from "@/utils/navigationConfig";
import StaffDashboard from "@/features/dashboard/teacher/pages/TeacherDashboard";
import AdminFeesPage from "@/features/fees/pages/AdminFeesPage";
import UserLeaveRequestPage from "@/features/leaves/pages/UserLeaveRequestPage";

const StaffRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={staffNav} />}>
      <Route index path="dashboard" element={<StaffDashboard />} />
      
      {/* Fees */}
      <Route path="fees" element={<AdminFeesPage />} />
      
      {/* Leave Requests */}
      <Route path="leaves" element={<UserLeaveRequestPage />} />
      
      {/* TODO: Implement these pages */}
      {/* <Route path="attendance" element={<StaffAttendancePage />} /> */}
      {/* <Route path="students" element={<StudentRecordsPage />} /> */}
    </Route>
  </Routes>
);

export default StaffRoutes;
