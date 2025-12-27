import { useState, useCallback } from "react";
import { useSalarySlips } from "../hooks/useSalarySlips";
import { useGenerateSalary } from "../hooks/useGenerateSalary";
import { useMarkSalaryPaid } from "../hooks/useMarkSalaryPaid";
import SalarySlipsTable from "../components/SalarySlipsTable";
import GenerateSalaryModal from "../components/GenerateSalaryModal";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import { Plus, DollarSign } from "lucide-react";
import { GenerateSalaryInput } from "../types/salary.types";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { Users, Calendar } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Card from "@/components/common/Card";

const AdminPayrollPage = () => {
  const [isShowGenerateModal, setIsShowGenerateModal] = useState(false);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const { salarySlips, isSalarySlipsLoading, salarySlipsError } = useSalarySlips(
    selectedEmployeeId,
    selectedEmployeeType,
    selectedMonth || undefined,
    selectedYear || undefined
  );
  const { generateSalaryMutation, isGeneratingSalary } = useGenerateSalary();
  const { markSalaryPaidMutation, isMarkingSalaryPaid } = useMarkSalaryPaid();

  const handleShowGenerateModal = useCallback(() => {
    setIsShowGenerateModal(true);
  }, []);

  const handleCloseGenerateModal = useCallback(() => {
    setIsShowGenerateModal(false);
  }, []);

  const handleGenerateSalary = useCallback(
    (data: GenerateSalaryInput) => {
      generateSalaryMutation(data, {
        onSuccess: () => {
          handleCloseGenerateModal();
        },
      });
    },
    [generateSalaryMutation, handleCloseGenerateModal]
  );

  const handleMarkPaid = useCallback(
    (id: string) => {
      markSalaryPaidMutation(id);
    },
    [markSalaryPaidMutation]
  );

  const handleDownload = useCallback((salarySlip: any) => {
    // TODO: Implement salary slip download/print functionality
    console.log("Download salary slip:", salarySlip);
    // This would typically generate a PDF
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  // Calculate statistics
  const statistics = {
    total: salarySlips.length,
    paid: salarySlips.filter((s) => s.status === "PAID").length,
    unpaid: salarySlips.filter((s) => s.status === "UNPAID").length,
    totalAmount: salarySlips.reduce((sum, s) => sum + s.netSalary, 0),
    totalPaid: salarySlips.filter((s) => s.status === "PAID").reduce((sum, s) => sum + s.netSalary, 0),
    totalUnpaid: salarySlips.filter((s) => s.status === "UNPAID").reduce((sum, s) => sum + s.netSalary, 0),
  };

  if (isSalarySlipsLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Payroll</h1>
          <p className="text-sm text-text-secondary mt-1">
            Generate and manage salary slips for teachers and staff
          </p>
        </div>
        <Button
          onClick={handleShowGenerateModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Generate Salary
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <FormRowVertical
            label="Employee Type"
            name="employeeType"
            icon={<Users className="inline w-4 h-4" />}
          >
            <select
              value={selectedEmployeeType || ""}
              onChange={(e) => setSelectedEmployeeType(e.target.value || null)}
              className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">All Types</option>
              <option value="TEACHER">Teacher</option>
              <option value="STAFF">Staff</option>
            </select>
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
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
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
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Statistics</h3>
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
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-text-secondary">Total Paid</div>
                  <div className="text-lg font-bold text-green-600">
                    {statistics.totalPaid.toLocaleString()} PKR
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Total Unpaid</div>
                  <div className="text-lg font-bold text-red-600">
                    {statistics.totalUnpaid.toLocaleString()} PKR
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <SalarySlipsTable
            salarySlips={salarySlips}
            onMarkPaid={handleMarkPaid}
            onDownload={handleDownload}
            canMarkPaid={true}
            isMarkingPaid={isMarkingSalaryPaid}
          />
        </>
      ) : (
        <EmptyState
          icon={DollarSign}
          title="No salary slips found"
          description="Generate salary slips to get started"
        />
      )}

      {/* Generate Salary Modal */}
      {isShowGenerateModal && (
        <GenerateSalaryModal
          onClose={handleCloseGenerateModal}
          onSubmit={handleGenerateSalary}
          isSubmitting={isGeneratingSalary}
        />
      )}
    </div>
  );
};

export default AdminPayrollPage;

