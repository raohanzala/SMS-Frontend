import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSalarySlips } from "../hooks/useSalarySlips";
import SalarySlipsTable from "../components/SalarySlipsTable";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { Calendar, DollarSign } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Card from "@/components/common/Card";

const StaffSalaryPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const employeeId = user?.profile as string;

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { salarySlips, isSalarySlipsLoading, salarySlipsError } = useSalarySlips(
    employeeId,
    "STAFF",
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
    if (salarySlips.length === 0) return null;

    const total = salarySlips.length;
    const paid = salarySlips.filter((s) => s.status === "PAID").length;
    const unpaid = salarySlips.filter((s) => s.status === "UNPAID").length;
    const totalAmount = salarySlips.reduce((sum, s) => sum + s.netSalary, 0);
    const totalPaid = salarySlips.filter((s) => s.status === "PAID").reduce((sum, s) => sum + s.netSalary, 0);
    const totalUnpaid = salarySlips.filter((s) => s.status === "UNPAID").reduce((sum, s) => sum + s.netSalary, 0);

    return {
      total,
      paid,
      unpaid,
      totalAmount,
      totalPaid,
      totalUnpaid,
    };
  }, [salarySlips]);

  if (isSalarySlipsLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">My Salary</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {salarySlipsError ? (
        <ErrorMessage message={salarySlipsError.message || "Failed to load salary slips"} />
      ) : salarySlips.length > 0 ? (
        <>
          {/* Statistics */}
          {statistics && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-text-primary">{statistics.total}</div>
                    <div className="text-sm text-text-secondary mt-1">Total Slips</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{statistics.paid}</div>
                    <div className="text-sm text-text-secondary mt-1">Paid</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{statistics.unpaid}</div>
                    <div className="text-sm text-text-secondary mt-1">Unpaid</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {statistics.totalAmount.toLocaleString()} PKR
                    </div>
                    <div className="text-sm text-text-secondary mt-1">Total Amount</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <SalarySlipsTable
            salarySlips={salarySlips}
            canMarkPaid={false}
          />
        </>
      ) : (
        <EmptyState
          icon={DollarSign}
          title="No salary slips found"
          description="No salary slips found for the selected filters"
        />
      )}
    </div>
  );
};

export default StaffSalaryPage;

