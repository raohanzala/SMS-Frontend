import { AttendanceStatistics } from "../types/attendance.types";
import { Users, CheckCircle, XCircle, Clock, Calendar } from "lucide-react";

interface AttendanceStatisticsBarProps {
  statistics: AttendanceStatistics;
}

const AttendanceStatisticsBar = ({ statistics }: AttendanceStatisticsBarProps) => {
  const stats = [
    {
      label: "Total",
      value: statistics.total,
      icon: Users,
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      label: "Present",
      value: statistics.present,
      icon: CheckCircle,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      label: "Absent",
      value: statistics.absent,
      icon: XCircle,
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      label: "Late",
      value: statistics.late,
      icon: Clock,
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      label: "Leave",
      value: statistics.leave,
      icon: Calendar,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-3 p-3 rounded-lg border ${stat.bgColor} ${stat.borderColor} transition-all hover:shadow-sm`}
            >
              <div className={`p-2 rounded-full ${stat.bgColor} ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-xl font-bold ${stat.color} mt-0.5`}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceStatisticsBar;

