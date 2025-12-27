import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAttendanceReport } from "../hooks/useAttendanceReport";
import { useStudents } from "@/features/students/hooks/useStudents";
import AttendanceStatusBadge from "../components/AttendanceStatusBadge";
import Card from "@/components/common/Card";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import EntitySelect from "@/components/common/EntitySelect";
import { formatShortDate } from "@/utils/helpers";

const ParentAttendancePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const parentId = user?.profile as string;

  // Get children
  const { students: children } = useStudents({ parentId });

  // Get current month start and end
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<string>(currentMonthStart);
  const [toDate, setToDate] = useState<string>(currentMonthEnd);

  // Set default student to first child
  useMemo(() => {
    if (children && children.length > 0 && !selectedStudentId) {
      setSelectedStudentId(children[0]._id);
    }
  }, [children, selectedStudentId]);

  const { report, isReportLoading, reportError } = useAttendanceReport(
    selectedStudentId,
    fromDate,
    toDate
  );

  if (isReportLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Child Attendance</h1>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FormRowVertical label="Select Child" name="student">
            <EntitySelect
              entity="student"
              value={selectedStudentId}
              onChange={(value) => setSelectedStudentId(Array.isArray(value) ? value[0] || null : value)}
              placeholder="Select child"
            />
          </FormRowVertical>
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

        {!selectedStudentId ? (
          <div className="text-center py-12 text-text-secondary">
            Please select a child to view attendance
          </div>
        ) : reportError ? (
          <ErrorMessage message={reportError.message || "Failed to load attendance report"} />
        ) : report ? (
          <>
            {/* Statistics */}
            <div className="mb-6 p-6 bg-bg-secondary rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Statistics for {report.student.name}
              </h3>
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
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-border rounded-lg">
                  <thead className="bg-bg-secondary">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-bg-main divide-y divide-gray-200">
                    {report.attendance.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-text-secondary">
                          No attendance records found for this period
                        </td>
                      </tr>
                    ) : (
                      report.attendance.map((entry, index) => (
                        <tr key={index} className="hover:bg-bg-secondary">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                            {formatShortDate(entry.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                            {entry.class.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <AttendanceStatusBadge status={entry.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                            {entry.remarks || "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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

export default ParentAttendancePage;

