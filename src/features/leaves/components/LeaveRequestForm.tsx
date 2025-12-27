import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { CreateLeaveRequestInput } from "../types/leave.types";
import { Calendar, FileText } from "lucide-react";

interface LeaveRequestFormProps {
  onClose: () => void;
  onSubmit: (data: CreateLeaveRequestInput) => void;
  isSubmitting: boolean;
}

const LeaveRequestForm = ({
  onClose,
  onSubmit,
  isSubmitting,
}: LeaveRequestFormProps) => {
  const validationSchema = Yup.object({
    leaveType: Yup.string()
      .required("Leave type is required")
      .oneOf(["SICK", "CASUAL", "EMERGENCY", "OTHER"], "Invalid leave type"),
    fromDate: Yup.string().required("From date is required"),
    toDate: Yup.string()
      .required("To date is required")
      .test("toDate", "To date must be after from date", function (value) {
        const { fromDate } = this.parent;
        if (!value || !fromDate) return true;
        return new Date(value) >= new Date(fromDate);
      }),
    reason: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      leaveType: "" as "SICK" | "CASUAL" | "EMERGENCY" | "OTHER" | "",
      fromDate: "",
      toDate: "",
      reason: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        leaveType: values.leaveType as "SICK" | "CASUAL" | "EMERGENCY" | "OTHER",
        fromDate: values.fromDate,
        toDate: values.toDate,
        reason: values.reason || undefined,
      });
    },
  });

  const leaveTypes = [
    { value: "SICK", label: "Sick Leave" },
    { value: "CASUAL", label: "Casual Leave" },
    { value: "EMERGENCY", label: "Emergency Leave" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Request Leave"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormRowVertical
          label="Leave Type"
          name="leaveType"
          error={formik.errors.leaveType}
          required
          icon={<FileText className="inline w-4 h-4" />}
        >
          <select
            name="leaveType"
            value={formik.values.leaveType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Select leave type</option>
            {leaveTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </FormRowVertical>

        <FormRowVertical
          label="From Date"
          name="fromDate"
          error={formik.errors.fromDate}
          required
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <Input
            type="date"
            name="fromDate"
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            min={new Date().toISOString().split("T")[0]}
          />
        </FormRowVertical>

        <FormRowVertical
          label="To Date"
          name="toDate"
          error={formik.errors.toDate}
          required
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <Input
            type="date"
            name="toDate"
            value={formik.values.toDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            min={formik.values.fromDate || new Date().toISOString().split("T")[0]}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Reason"
          name="reason"
          error={formik.errors.reason}
          icon={<FileText className="inline w-4 h-4" />}
        >
          <Input
            type="text"
            name="reason"
            value={formik.values.reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Optional reason for leave"
            disabled={isSubmitting}
          />
        </FormRowVertical>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LeaveRequestForm;

