import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import EntitySelect from "@/components/common/EntitySelect";
import { GenerateSalaryInput } from "../types/salary.types";
import { Calendar, Users } from "lucide-react";

interface GenerateSalaryModalProps {
  onClose: () => void;
  onSubmit: (data: GenerateSalaryInput) => void;
  isSubmitting: boolean;
}

const GenerateSalaryModal = ({
  onClose,
  onSubmit,
  isSubmitting,
}: GenerateSalaryModalProps) => {
  const validationSchema = Yup.object({
    month: Yup.string().required("Month is required"),
    year: Yup.number()
      .required("Year is required")
      .min(2000, "Year must be 2000 or later")
      .max(2100, "Year must be 2100 or earlier"),
    employeeType: Yup.string()
      .required("Employee type is required")
      .oneOf(["TEACHER", "STAFF"], "Invalid employee type"),
    employeeId: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      month: "",
      year: new Date().getFullYear(),
      employeeType: "" as "TEACHER" | "STAFF" | "",
      employeeId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        month: values.month,
        year: values.year,
        employeeType: values.employeeType as "TEACHER" | "STAFF",
        employeeId: values.employeeId || undefined,
      });
    },
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Generate Salary Slips"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormRowVertical
          label="Employee Type"
          name="employeeType"
          error={formik.errors.employeeType}
          required
          icon={<Users className="inline w-4 h-4" />}
        >
          <select
            name="employeeType"
            value={formik.values.employeeType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Select employee type</option>
            <option value="TEACHER">Teacher</option>
            <option value="STAFF">Staff</option>
          </select>
        </FormRowVertical>

        {formik.values.employeeType && (
          <FormRowVertical
            label="Employee (Optional)"
            name="employeeId"
            error={formik.errors.employeeId}
            icon={<Users className="inline w-4 h-4" />}
            helperText="Leave empty to generate for all employees"
          >
            {formik.values.employeeType === "TEACHER" ? (
              <EntitySelect
                entity="teacher"
                value={formik.values.employeeId}
                onChange={(value) =>
                  formik.setFieldValue("employeeId", Array.isArray(value) ? value[0] || "" : value || "")
                }
                placeholder="Select teacher (optional)"
                isDisabled={isSubmitting}
              />
            ) : (
              <Input
                type="text"
                value={formik.values.employeeId}
                onChange={(e) => formik.setFieldValue("employeeId", e.target.value)}
                placeholder="Enter staff ID (optional)"
                disabled={isSubmitting}
              />
            )}
          </FormRowVertical>
        )}

        <FormRowVertical
          label="Month"
          name="month"
          error={formik.errors.month}
          required
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <select
            name="month"
            value={formik.values.month}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Select month</option>
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
          error={formik.errors.year}
          required
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <select
            name="year"
            value={formik.values.year}
            onChange={(e) => formik.setFieldValue("year", parseInt(e.target.value))}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </FormRowVertical>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This will generate salary slips based on finalized attendance records.
            Deductions are calculated based on absent days.
          </p>
        </div>

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
            Generate Salary Slips
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GenerateSalaryModal;

