import { useLocation, useParams } from "react-router-dom";

export function usePageTitle() {
  const location = useLocation();
  const params = useParams();

  const getPageTitle = (): string => {
    const path = location.pathname;

    // Super Admin routes
    if (path.startsWith("/super-admin")) {
      if (path === "/super-admin/dashboard") return "Dashboard";
      if (path === "/super-admin/settings") return "SaaS Settings";
      if (path === "/super-admin/plans") return "Subscription Plans";
      if (path === "/super-admin/schools") return "Schools Management";
      if (path === "/super-admin/subscriptions") return "Subscriptions";
      if (path === "/super-admin/owners") return "School Owners";
      if (path === "/super-admin/audit-logs") return "Audit Logs";
    }

    // Owner routes
    if (path.startsWith("/owner")) {
      // Detail/Edit pages
      if (params.studentId && path.includes("/edit")) return "Edit Student";
      if (params.teacherId && path.includes("/edit")) return "Edit Teacher";
      if (params.employeeId && path.includes("/edit")) return "Edit Employee";

      // Main pages
      if (path === "/owner/dashboard") return "Dashboard";
      if (path === "/owner/campuses" || path === "/owner/settings/campuses") return "Campuses";
      if (path === "/owner/students") return "Students";
      if (path === "/owner/students/new") return "Add Student";
      if (path === "/owner/teachers") return "Teachers";
      if (path === "/owner/teachers/new") return "Add Teacher";
      if (path === "/owner/staff") return "Staff";
      if (path === "/owner/staff/new") return "Add Staff";
      if (path === "/owner/sessions") return "Sessions";
      if (path === "/owner/classes") return "Classes";
      if (path === "/owner/fees/structure") return "Fee Structure";
      if (path === "/owner/settings") return "Settings";
      if (path === "/owner/audit-logs") return "Audit Logs";
    }

    // Admin routes
    if (path.startsWith("/admin")) {
      // Detail/Edit pages
      if (params.studentId && path.includes("/edit")) return "Edit Student";
      if (params.teacherId && path.includes("/edit")) return "Edit Teacher";
      if (params.employeeId && path.includes("/edit")) return "Edit Employee";
      if (params.studentId) return "Student Details";
      if (params.teacherId) return "Teacher Details";
      if (params.parentId) return "Parent Details";
      if (params.classId) return "Class Details";
      if (params.subjectId) return "Subject Details";

      // Main pages
      if (path === "/admin/dashboard") return "Dashboard";
      if (path === "/admin/students") return "Students";
      if (path === "/admin/students/new") return "Add Student";
      if (path === "/admin/teachers") return "Teachers";
      if (path === "/admin/teachers/new") return "Add Teacher";
      if (path === "/admin/employees") return "Staff";
      if (path === "/admin/employees/new") return "Add Staff";
      if (path === "/admin/classes") return "Classes";
      if (path === "/admin/subjects") return "Subjects";
      if (path === "/admin/attendance/class") return "Class Attendance";
      if (path === "/admin/attendance/teachers") return "Teacher Attendance";
      if (path === "/admin/attendance/staff") return "Staff Attendance";
      if (path === "/admin/exams") return "Exams";
      if (path === "/admin/fees" || path === "/admin/fees/structure") return "Fees";
      if (path === "/admin/certificates") return "Certificates";
      if (path === "/admin/activity-logs") return "Activity Logs";
    }

    // Teacher routes
    if (path.startsWith("/teacher")) {
      if (path === "/teacher/dashboard") return "Dashboard";
      if (path === "/teacher/attendance") return "My Attendance";
      if (path === "/teacher/attendance/class") return "Class Attendance";
      if (path === "/teacher/marks") return "Marks";
      if (path === "/teacher/leaves") return "Leave Requests";
      if (path === "/teacher/salary") return "Salary";
    }

    // Staff routes
    if (path.startsWith("/staff")) {
      if (path === "/staff/dashboard") return "Dashboard";
      if (path === "/staff/fees") return "Fees";
      if (path === "/staff/leaves") return "Leave Requests";
    }

    // Student routes
    if (path.startsWith("/student")) {
      if (path === "/student/dashboard") return "Dashboard";
      if (path === "/student/attendance") return "Attendance";
      if (path === "/student/results") return "Results";
      if (path === "/student/fees") return "Fees";
    }

    // Parent routes
    if (path.startsWith("/parent")) {
      if (path === "/parent/dashboard") return "Dashboard";
      if (path === "/parent/attendance") return "Attendance";
      if (path === "/parent/results") return "Results";
      if (path === "/parent/fees") return "Fees";
    }

    // Onboarding routes
    if (path.startsWith("/onboarding")) {
      if (path === "/onboarding/create-school") return "Create School";
    }

    // Default fallback
    return "Dashboard";
  };

  return getPageTitle();
}

