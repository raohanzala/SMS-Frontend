import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFeeReport } from "../hooks/useFeeReport";
import { usePayFee } from "../hooks/usePayFee";
import { useGenerateMonthlyFees } from "../hooks/useGenerateMonthlyFees";
import StudentFeesTable from "../components/StudentFeesTable";
import PayFeeModal from "../components/PayFeeModal";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import { StudentFee, PayFeeInput, GenerateMonthlyFeesInput } from "../types/fee.types";
import CampusClassFilter from "../components/CampusClassFilter";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import { Calendar, DollarSign, Plus } from "lucide-react";
import { useAllSessions } from "@/features/students/hooks/useAllSessions";
import Card from "@/components/common/Card";
import EmptyState from "@/components/common/EmptyState";
import Modal from "@/components/common/Modal";

const AdminFeesPage = () => {
  const [selectedCampusId, setSelectedCampusId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [feeToPay, setFeeToPay] = useState<StudentFee | null>(null);
  const [isShowPayModal, setIsShowPayModal] = useState(false);
  const [isShowGenerateModal, setIsShowGenerateModal] = useState(false);

  const { campus: currentCampus } = useSelector((state: RootState) => state.auth);
  const { sessions } = useAllSessions();

  // Set default campus to current campus
  useMemo(() => {
    if (currentCampus?._id && !selectedCampusId) {
      setSelectedCampusId(currentCampus._id);
    }
  }, [currentCampus, selectedCampusId]);

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

  const { report, isReportLoading, reportError } = useFeeReport(
    selectedClassId,
    selectedMonth,
    selectedYear,
    selectedSessionId
  );

  const { payFeeMutation, isPayingFee } = usePayFee();
  const { generateMonthlyFeesMutation, isGeneratingFees } = useGenerateMonthlyFees();

  const handlePayFee = (fee: StudentFee) => {
    setFeeToPay(fee);
    setIsShowPayModal(true);
  };

  const handleClosePayModal = () => {
    setFeeToPay(null);
    setIsShowPayModal(false);
  };

  const handleSubmitPayment = (data: PayFeeInput) => {
    if (feeToPay) {
      payFeeMutation(
        {
          feeId: feeToPay._id,
          payload: data,
        },
        {
          onSuccess: () => {
            handleClosePayModal();
          },
        }
      );
    }
  };

  const handleGenerateFees = () => {
    if (!selectedSessionId || !selectedMonth || !selectedYear) {
      return;
    }
    const payload: GenerateMonthlyFeesInput = {
      sessionId: selectedSessionId,
      month: selectedMonth,
      year: selectedYear,
      classId: selectedClassId || undefined,
    };
    generateMonthlyFeesMutation(payload);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Student Fees</h1>
          <p className="text-sm text-text-secondary mt-1">
            View and manage student fees
          </p>
        </div>
        <Button
          onClick={() => setIsShowGenerateModal(true)}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Generate Fees
        </Button>
      </div>

      <CampusClassFilter
        selectedCampusId={selectedCampusId}
        selectedClassId={selectedClassId}
        onCampusChange={setSelectedCampusId}
        onClassChange={setSelectedClassId}
      />

      {/* Session, Month, Year Filters */}
      <Card className="mb-4">
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
      </Card>

      {reportError ? (
        <ErrorMessage message={reportError.message || "Failed to load fees"} />
      ) : isReportLoading ? (
        <Spinner />
      ) : report ? (
        <>
          {/* Statistics */}
          {report.statistics && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-text-primary">{report.statistics.total}</div>
                    <div className="text-sm text-text-secondary mt-1">Total Fees</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{report.statistics.paid}</div>
                    <div className="text-sm text-text-secondary mt-1">Paid</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{report.statistics.partial}</div>
                    <div className="text-sm text-text-secondary mt-1">Partial</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{report.statistics.pending}</div>
                    <div className="text-sm text-text-secondary mt-1">Pending</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-text-secondary">Total Amount</div>
                    <div className="text-lg font-bold text-text-primary">
                      {report.statistics.totalAmount.toLocaleString()} PKR
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Total Paid</div>
                    <div className="text-lg font-bold text-green-600">
                      {report.statistics.totalPaid.toLocaleString()} PKR
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Total Pending</div>
                    <div className="text-lg font-bold text-red-600">
                      {report.statistics.totalPending.toLocaleString()} PKR
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <StudentFeesTable
            fees={report.fees}
            onPayFee={handlePayFee}
            canPay={true}
          />
        </>
      ) : (
        <EmptyState
          icon={DollarSign}
          title="No fees found"
          description="Select filters to view fees or generate monthly fees"
        />
      )}

      {/* Pay Fee Modal */}
      {isShowPayModal && feeToPay && (
        <PayFeeModal
          fee={feeToPay}
          onClose={handleClosePayModal}
          onSubmit={handleSubmitPayment}
          isSubmitting={isPayingFee}
        />
      )}

      {/* Generate Fees Modal */}
      {isShowGenerateModal && (
        <Modal
          isOpen={true}
          onClose={() => setIsShowGenerateModal(false)}
          title="Generate Monthly Fees"
        >
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              This will generate monthly fees for all students (or selected class) for the specified month and year.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setIsShowGenerateModal(false)}
                disabled={isGeneratingFees}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerateFees}
                loading={isGeneratingFees}
                disabled={isGeneratingFees || !selectedSessionId || !selectedMonth || !selectedYear}
              >
                Generate Fees
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminFeesPage;

