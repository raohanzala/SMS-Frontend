import { Routes, Route } from "react-router-dom";
import { teacherNav } from "@/utils/navigationConfig";
import Layout from "@/components/layout/Layout";
import TeacherDashboard from "@/features/dashboard/teacher/pages/TeacherDashboard";
import TeacherMyAttendancePage from "@/features/teacherAttendance/pages/TeacherMyAttendancePage";

const TeacherRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={teacherNav} />}>
      <Route index element={<TeacherDashboard />} />
      <Route path="attendance" element={<TeacherMyAttendancePage />} />
    </Route>
  </Routes>
);

export default TeacherRoutes;
