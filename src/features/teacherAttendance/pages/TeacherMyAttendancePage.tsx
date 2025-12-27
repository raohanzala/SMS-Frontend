import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTeacherAttendanceReport } from "../hooks/useTeacherAttendanceReport";
import TeacherAttendanceStatusBadge from "../components/TeacherAttendanceStatusBadge";
import Card from "@/components/common/Card";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { formatShortDate } from "@/utils/helpers";
import Table from "@/components/common/Table";

const TeacherMyAttendancePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const teacherId = user?.userRef as string;

  // Get current month start and end
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const [fromDate, setFromDate] = useState<string>(currentMonthStart);
  const [toDate, setToDate] = useState<string>(currentMonthEnd);

  const { report, isReportLoading, reportError } = useTeacherAttendanceReport(
    teacherId,
    fromDate,
    toDate
  );

  if (isReportLoading) {
    return <Spinner />;
  }

  const reportColumns = [
    {
      key: "date",
      header: "Date",
      render: (row: { date: string }) => (
        <span className="text-sm text-text-primary">{formatShortDate(row.date)}</span>
      ),
    },
    {
      key: "session",
      header: "Session",
      render: (row: { session: { name: string } }) => (
        <span className="text-sm text-text-primary">{row.session.name}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: { status: string }) => (
        <TeacherAttendanceStatusBadge status={row.status as any} />
      ),
    },
    {
      key: "inTime",
      header: "In Time",
      render: (row: { inTime?: string | null }) => (
        <span className="text-sm text-text-secondary">{row.inTime || "-"}</span>
      ),
    },
    {
      key: "outTime",
      header: "Out Time",
      render: (row: { outTime?: string | null }) => (
        <span className="text-sm text-text-secondary">{row.outTime || "-"}</span>
      ),
    },
    {
      key: "substitute",
      header: "Substitute",
      render: (row: { substituteAssigned?: boolean; substituteTeacher?: { name: string } | null }) => (
        <span className="text-sm text-text-secondary">
          {row.substituteAssigned && row.substituteTeacher
            ? row.substituteTeacher.name
            : "-"}
        </span>
      ),
    },
    {
      key: "remarks",
      header: "Remarks",
      render: (row: { remarks?: string }) => (
        <span className="text-sm text-text-secondary">{row.remarks || "-"}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">My Attendance</h1>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormRowVertical label="From Date" name="fromDate">
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </FormRowVertical>
          <FormRowVertical label="To Date" name="toDate">
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </FormRowVertical>
        </div>

        {reportError ? (
          <ErrorMessage message={reportError.message || "Failed to load attendance report"} />
        ) : report ? (
          <>
            {/* Statistics */}
            <div className="mb-6 p-6 bg-bg-secondary rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-text-primary">{report.statistics.totalDays}</div>
                  <div className="text-sm text-text-secondary mt-1">Total Days</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{report.statistics.present}</div>
                  <div className="text-sm text-text-secondary mt-1">Present</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{report.statistics.absent}</div>
                  <div className="text-sm text-text-secondary mt-1">Absent</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {report.statistics.attendancePercentage}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">Attendance %</div>
                </div>
              </div>
            </div>

            {/* Attendance Details */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Attendance Details</h3>
              <Table
                title=""
                data={report.attendance}
                columns={reportColumns}
                selectable={false}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-text-secondary">
            No attendance data available
          </div>
        )}
      </Card>
    </div>
  );
};

export default TeacherMyAttendancePage;

