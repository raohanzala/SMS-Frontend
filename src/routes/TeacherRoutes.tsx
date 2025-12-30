import { Routes, Route } from "react-router-dom";
import { teacherNav } from "@/utils/navigationConfig";
import Layout from "@/components/layout/Layout";
import TeacherDashboard from "@/features/dashboard/teacher/pages/TeacherDashboard";
import AdminClassAttendancePage from "@/features/attendance/pages/AdminClassAttendancePage";
import TeacherMarksPage from "@/features/exams/pages/TeacherMarksPage";
import TeacherMyAttendancePage from "@/features/teacherAttendance/pages/TeacherMyAttendancePage";
import UserLeaveRequestPage from "@/features/leaves/pages/UserLeaveRequestPage";
import TeacherSalaryPage from "@/features/salary/pages/TeacherSalaryPage";

const TeacherRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={teacherNav} />}>
      <Route index path="dashboard" element={<TeacherDashboard />} />
      
      {/* Attendance */}
      <Route path="attendance" element={<TeacherMyAttendancePage />} />
      <Route path="attendance/class" element={<AdminClassAttendancePage />} />
      
      {/* Marks */}
      <Route path="marks" element={<TeacherMarksPage />} />
      
      {/* Leave Requests */}
      <Route path="leaves" element={<UserLeaveRequestPage />} />
      
      {/* Salary */}
      <Route path="salary" element={<TeacherSalaryPage />} />
      
      {/* TODO: Implement these pages */}
      {/* <Route path="classes" element={<MyClassesPage />} /> */}
      {/* <Route path="timetable" element={<TeacherTimetablePage />} /> */}
    </Route>
  </Routes>
);

export default TeacherRoutes;
