import { AttendanceStatus } from "../types/attendance.types";

interface AttendanceStatusBadgeProps {
  status: AttendanceStatus;
  size?: "sm" | "md";
}

const AttendanceStatusBadge = ({ status, size = "md" }: AttendanceStatusBadgeProps) => {
  const statusConfig = {
    PRESENT: {
      label: "Present",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    ABSENT: {
      label: "Absent",
      className: "bg-red-100 text-red-800 border-red-200",
    },
    LATE: {
      label: "Late",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    LEAVE: {
      label: "Leave",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
  };

  const config = statusConfig[status];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.className} ${sizeClass}`}
    >
      {config.label}
    </span>
  );
};

export default AttendanceStatusBadge;

