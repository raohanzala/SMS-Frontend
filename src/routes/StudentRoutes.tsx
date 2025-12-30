import { Routes, Route, Navigate } from "react-router-dom";
import { studentNav } from "@/utils/navigationConfig";
import Layout from "@/components/layout/Layout";
import StudentDashboard from "@/features/dashboard/student/pages/StudentDashboard";
import StudentAttendancePage from "@/features/attendance/pages/StudentAttendancePage";
import StudentResultsPage from "@/features/exams/pages/StudentResultsPage";
import StudentFeesPage from "@/features/fees/pages/StudentFeesPage";

const StudentRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={studentNav} />}>
      <Route index element={<Navigate to="/student/dashboard" replace />} />
      <Route path="dashboard" element={<StudentDashboard />} />
      
      {/* Attendance */}
      <Route path="attendance" element={<StudentAttendancePage />} />
      
      {/* Exams & Results */}
      <Route path="results" element={<StudentResultsPage />} />
      
      {/* Fees */}
      <Route path="fees" element={<StudentFeesPage />} />
      
      {/* TODO: Implement these pages */}
      {/* <Route path="profile" element={<StudentProfilePage />} /> */}
      {/* <Route path="timetable" element={<StudentTimetablePage />} /> */}
      {/* <Route path="certificates" element={<StudentCertificatesPage />} /> */}
    </Route>
  </Routes>
);

export default StudentRoutes;
