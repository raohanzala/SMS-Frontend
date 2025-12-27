interface AttendanceFinalizationBadgeProps {
  isFinalized: boolean;
}

const AttendanceFinalizationBadge = ({ isFinalized }: AttendanceFinalizationBadgeProps) => {
  if (isFinalized) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
        🔒 Finalized
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
      🟡 Draft
    </span>
  );
};

export default AttendanceFinalizationBadge;

