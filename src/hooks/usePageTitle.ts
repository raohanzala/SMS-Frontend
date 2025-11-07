import { useLocation, useParams } from "react-router-dom";

export function usePageTitle() {
  const location = useLocation();
  const params = useParams();

  const getPageTitle = (): string => {
    const path = location.pathname;

    // Admin routes
    if (path.startsWith("/admin")) {
      // Detail pages
      if (params.studentId) return "Student Details";
      if (params.teacherId) return "Teacher Details";
      if (params.parentId) return "Parent Details";
      if (params.classId) return "Class Details";
      if (params.subjectId) return "Subject Details";

      // Main pages
      if (path === "/admin/dashboard") return "Dashboard";
      if (path === "/admin/students") return "Students";
      if (path === "/admin/parents") return "Parents";
      if (path === "/admin/teachers") return "Teachers";
      if (path === "/admin/classes") return "Classes";
      if (path === "/admin/subjects") return "Subjects";
      if (path === "/admin/timetable") return "Timetable";
      if (path === "/admin/attendance/class") return "Class Attendance";
      if (path === "/admin/attendance/employees") return "Employees Attendance";
      if (path === "/admin/fees") return "Fees";
      if (path === "/admin/exams") return "Exams";
      if (path === "/admin/results") return "Results";
      if (path === "/admin/noticeboard") return "Noticeboard";
      if (path === "/admin/settings") return "Settings";
    }

    // Teacher routes
    if (path.startsWith("/teacher")) {
      if (path === "/teacher/dashboard") return "Dashboard";
      if (path === "/teacher/attendance") return "Attendance";
      if (path === "/teacher/homework") return "Homework";
      if (path === "/teacher/marks") return "Marks";
      if (path === "/teacher/timetable") return "Timetable";
      if (path === "/teacher/messages") return "Messages";
    }

    // Student routes
    if (path.startsWith("/student")) {
      if (path === "/student/dashboard") return "Dashboard";
      if (path === "/student/homework") return "Homework";
      if (path === "/student/attendance") return "Attendance";
      if (path === "/student/results") return "Results";
      if (path === "/student/notices") return "Notices";
      if (path === "/student/profile") return "Profile";
    }

    // Parent routes
    if (path.startsWith("/parent")) {
      if (path === "/parent/dashboard") return "Dashboard";
      if (path === "/parent/fees") return "Fees";
      if (path === "/parent/results") return "Results";
      if (path === "/parent/messages") return "Messages";
      if (path === "/parent/notices") return "Notices";
    }

    // Default fallback
    return "Dashboard";
  };

  return getPageTitle();
}

