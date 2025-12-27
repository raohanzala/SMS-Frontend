import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useStudentFees } from "../hooks/useStudentFees";
import StudentFeesTable from "../components/StudentFeesTable";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import EntitySelect from "@/components/common/EntitySelect";
import { Calendar, DollarSign } from "lucide-react";
import { useAllSessions } from "@/features/students/hooks/useAllSessions";
import EmptyState from "@/components/common/EmptyState";

const StudentFeesPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const studentId = user?.profile as string;

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { sessions } = useAllSessions();

  // Get active session or first session as default
  const activeSession = useMemo(() => {
    if (sessions && sessions.length > 0) {
      const active = sessions.find((s) => s.isActive);
      return active || sessions[0];
    }
    return null;
  }, [sessions]);

  useMemo(() => {
    if (activeSession && !selectedSessionId) {
      setSelectedSessionId(activeSession._id);
    }
  }, [activeSession, selectedSessionId]);

  const { fees, isFeesLoading, feesError } = useStudentFees(
    studentId,
    selectedSessionId,
    selectedMonth || undefined,
    selectedYear || undefined
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = fees.length;
    const paid = fees.filter((f) => f.status === "PAID").length;
    const partial = fees.filter((f) => f.status === "PARTIAL").length;
    const pending = fees.filter((f) => f.status === "PENDING").length;
    const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
    const totalPaid = fees.reduce((sum, f) => sum + f.paidAmount, 0);
    const totalPending = totalAmount - totalPaid;

    return {
      total,
      paid,
      partial,
      pending,
      totalAmount,
      totalPaid,
      totalPending,
    };
  }, [fees]);

  if (isFeesLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">My Fees</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormRowVertical
            label="Session"
            name="session"
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="session"
              value={selectedSessionId}
              onChange={(value) =>
                setSelectedSessionId(Array.isArray(value) ? value[0] || null : value)
              }
              placeholder="Select session"
            />
          </FormRowVertical>

          <FormRowVertical
            label="Month"
            name="month"
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </FormRowVertical>

          <FormRowVertical
            label="Year"
            name="year"
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <select
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </FormRowVertical>
        </div>
      </div>

      {feesError ? (
        <ErrorMessage message={feesError.message || "Failed to load fees"} />
      ) : fees.length > 0 ? (
        <>
          {/* Statistics */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-text-primary">{statistics.total}</div>
                  <div className="text-sm text-text-secondary mt-1">Total Fees</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{statistics.paid}</div>
                  <div className="text-sm text-text-secondary mt-1">Paid</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{statistics.partial}</div>
                  <div className="text-sm text-text-secondary mt-1">Partial</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{statistics.pending}</div>
                  <div className="text-sm text-text-secondary mt-1">Pending</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-text-secondary">Total Amount</div>
                  <div className="text-lg font-bold text-text-primary">
                    {statistics.totalAmount.toLocaleString()} PKR
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Total Paid</div>
                  <div className="text-lg font-bold text-green-600">
                    {statistics.totalPaid.toLocaleString()} PKR
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Total Pending</div>
                  <div className="text-lg font-bold text-red-600">
                    {statistics.totalPending.toLocaleString()} PKR
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <StudentFeesTable fees={fees} canPay={false} />
        </>
      ) : (
        <EmptyState
          icon={DollarSign}
          title="No fees found"
          description="No fees records found for the selected filters"
        />
      )}
    </div>
  );
};

export default StudentFeesPage;

