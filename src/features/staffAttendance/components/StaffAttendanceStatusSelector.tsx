import { Check } from "lucide-react";

type StaffAttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE" | "HALF_DAY";

interface StaffAttendanceStatusSelectorProps {
  currentStatus: StaffAttendanceStatus;
  onStatusChange: (status: StaffAttendanceStatus) => void;
  disabled?: boolean;
}

const StaffAttendanceStatusSelector = ({
  currentStatus,
  onStatusChange,
  disabled = false,
}: StaffAttendanceStatusSelectorProps) => {
  const statusOptions: {
    status: StaffAttendanceStatus;
    label: string;
    color: string;
    bgColor: string;
    hoverColor: string;
    activeColor: string;
  }[] = [
    {
      status: "PRESENT",
      label: "P",
      color: "text-green-700",
      bgColor: "bg-green-100",
      hoverColor: "hover:bg-green-200",
      activeColor: "bg-green-500",
    },
    {
      status: "ABSENT",
      label: "A",
      color: "text-red-700",
      bgColor: "bg-red-100",
      hoverColor: "hover:bg-red-200",
      activeColor: "bg-red-500",
    },
    {
      status: "LATE",
      label: "L",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      hoverColor: "hover:bg-yellow-200",
      activeColor: "bg-yellow-500",
    },
    {
      status: "LEAVE",
      label: "LV",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
      activeColor: "bg-blue-500",
    },
    {
      status: "HALF_DAY",
      label: "HD",
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      hoverColor: "hover:bg-purple-200",
      activeColor: "bg-purple-500",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {statusOptions.map((option) => {
        const isSelected = currentStatus === option.status;
        return (
          <button
            key={option.status}
            type="button"
            onClick={() => !disabled && onStatusChange(option.status)}
            disabled={disabled}
            className={`
              relative flex items-center justify-center
              w-10 h-10 rounded-full
              font-semibold text-sm
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              ${
                isSelected
                  ? `${option.activeColor} text-white shadow-md scale-110`
                  : `${option.bgColor} ${option.color} ${option.hoverColor}`
              }
            `}
            title={option.status}
          >
            {isSelected && (
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            )}
            {!isSelected && (
              <span className="text-xs font-bold">{option.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StaffAttendanceStatusSelector;

