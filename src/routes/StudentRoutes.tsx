import { Routes, Route, Navigate } from "react-router-dom";
import { studentNav } from "@/utils/navigationConfig";
import Layout from "@/components/layout/Layout";
import StudentDashboard from "@/features/dashboard/student/pages/StudentDashboard";
import StudentAttendancePage from "@/features/attendance/pages/StudentAttendancePage";

const StudentRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={studentNav}/>}>
      <Route index element={<Navigate to="/student/dashboard" replace />} />
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="attendance" element={<StudentAttendancePage />} />
    </Route>
  </Routes>
);

export default StudentRoutes;
