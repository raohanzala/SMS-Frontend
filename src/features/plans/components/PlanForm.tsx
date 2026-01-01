import { useFormik } from "formik";
import * as Yup from "yup";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useCreatePlan } from "../hooks/useCreatePlan";
import { useUpdatePlan } from "../hooks/useUpdatePlan";
import { Plan } from "../types/plans.types";

interface PlanFormProps {
  planToEdit?: Plan | null;
  onClose: () => void;
}

const planSchema = Yup.object().shape({
  name: Yup.string().required("Plan name is required").trim(),
  code: Yup.string()
    .oneOf(["FREE", "BASIC", "PRO", "ENTERPRISE"], "Invalid plan code")
    .optional(),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  currency: Yup.string().optional(),
  billingCycle: Yup.string()
    .oneOf(["MONTHLY", "YEARLY"], "Invalid billing cycle")
    .required("Billing cycle is required"),
  isActive: Yup.boolean(),
  features: Yup.object().shape({
    maxStudents: Yup.number().min(0, "Must be 0 or greater").optional(),
    maxTeachers: Yup.number().min(0, "Must be 0 or greater").optional(),
    maxCampuses: Yup.number().min(0, "Must be 0 or greater").optional(),
    attendance: Yup.boolean().optional(),
    exams: Yup.boolean().optional(),
    fees: Yup.boolean().optional(),
    payroll: Yup.boolean().optional(),
    certificates: Yup.boolean().optional(),
  }),
});

const BILLING_CYCLES = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "PKR", label: "PKR (₨)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
];

const PLAN_CODES = [
  { value: "FREE", label: "Free" },
  { value: "BASIC", label: "Basic" },
  { value: "PRO", label: "Pro" },
  { value: "ENTERPRISE", label: "Enterprise" },
];

const PlanForm = ({ planToEdit, onClose }: PlanFormProps) => {
  const { createPlanMutation, isCreatingPlan } = useCreatePlan();
  const { updatePlanMutation, isUpdatingPlan } = useUpdatePlan();

  const isEditMode = !!planToEdit;
  const isLoading = isCreatingPlan || isUpdatingPlan;

  const formik = useFormik({
    initialValues: {
      name: planToEdit?.name || "",
      code: planToEdit?.code || "",
      price: planToEdit?.price ?? 0,
      currency: planToEdit?.currency || "USD",
      billingCycle: planToEdit?.billingCycle || "MONTHLY",
      isActive: planToEdit?.isActive ?? true,
      features: {
        maxStudents: planToEdit?.features?.maxStudents ?? 0,
        maxTeachers: planToEdit?.features?.maxTeachers ?? 0,
        maxCampuses: planToEdit?.features?.maxCampuses ?? 0,
        attendance: planToEdit?.features?.attendance ?? false,
        exams: planToEdit?.features?.exams ?? false,
        fees: planToEdit?.features?.fees ?? false,
        payroll: planToEdit?.features?.payroll ?? false,
        certificates: planToEdit?.features?.certificates ?? false,
      },
    },
    validationSchema: planSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const planData = {
        name: values.name.trim(),
        ...(values.code && { code: values.code }),
        price: values.price,
        currency: values.currency,
        billingCycle: values.billingCycle as "MONTHLY" | "YEARLY",
        isActive: values.isActive,
        features: {
          ...(values.features.maxStudents !== undefined && { maxStudents: values.features.maxStudents }),
          ...(values.features.maxTeachers !== undefined && { maxTeachers: values.features.maxTeachers }),
          ...(values.features.maxCampuses !== undefined && { maxCampuses: values.features.maxCampuses }),
          ...(values.features.attendance !== undefined && { attendance: values.features.attendance }),
          ...(values.features.exams !== undefined && { exams: values.features.exams }),
          ...(values.features.fees !== undefined && { fees: values.features.fees }),
          ...(values.features.payroll !== undefined && { payroll: values.features.payroll }),
          ...(values.features.certificates !== undefined && { certificates: values.features.certificates }),
        },
      };

      if (isEditMode && planToEdit?._id) {
        updatePlanMutation(
          { planId: planToEdit._id, planData },
          {
            onSuccess: () => onClose(),
          }
        );
      } else {
        createPlanMutation(planData, {
          onSuccess: () => onClose(),
        });
      }
    },
  });

  const { errors, values, setFieldValue, handleSubmit } = formik;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div className="space-y-4">
        {/* Plan Name */}
        <FormRowVertical label="Plan Name" name="name" error={errors.name} required>
          <Input
            type="text"
            placeholder="Enter plan name"
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>

        {/* Plan Code */}
        <FormRowVertical
          label="Plan Code"
          name="code"
          error={errors.code}
          helperText="Unique identifier for the plan (optional)"
        >
          <select
            value={values.code}
            onChange={(e) => setFieldValue("code", e.target.value)}
            disabled={isLoading}
            className="w-full mt-1 text-sm px-4 py-3 border border-border bg-bg-main text-text-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select plan code (optional)</option>
            {PLAN_CODES.map((code) => (
              <option key={code.value} value={code.value}>
                {code.label}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Price */}
        <FormRowVertical label="Price" name="price" error={errors.price} required>
          <Input
            type="number"
            placeholder="Enter price"
            value={values.price}
            onChange={(e) => setFieldValue("price", parseFloat(e.target.value) || 0)}
            min={0}
            step="0.01"
            disabled={isLoading}
          />
        </FormRowVertical>

        {/* Currency */}
        <FormRowVertical label="Currency" name="currency" error={errors.currency}>
          <select
            value={values.currency}
            onChange={(e) => setFieldValue("currency", e.target.value)}
            disabled={isLoading}
            className="w-full mt-1 text-sm px-4 py-3 border border-border bg-bg-main text-text-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {CURRENCIES.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Billing Cycle */}
        <FormRowVertical
          label="Billing Cycle"
          name="billingCycle"
          error={errors.billingCycle}
          required
        >
          <select
            value={values.billingCycle}
            onChange={(e) => setFieldValue("billingCycle", e.target.value)}
            disabled={isLoading}
            className="w-full mt-1 text-sm px-4 py-3 border border-border bg-bg-main text-text-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {BILLING_CYCLES.map((cycle) => (
              <option key={cycle.value} value={cycle.value}>
                {cycle.label}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Is Active */}
        <FormRowVertical
          label="Status"
          name="isActive"
          error={errors.isActive}
          helperText="Inactive plans will not be available for new subscriptions"
        >
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={(e) => setFieldValue("isActive", e.target.checked)}
                disabled={isLoading}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ml-3 text-sm font-medium text-text-primary">
                {values.isActive ? "Active" : "Inactive"}
              </span>
            </label>
          </div>
        </FormRowVertical>

        {/* Features Section */}
        <div className="border-t border-border pt-4 mt-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Plan Features</h3>
          
          <div className="space-y-4">
            {/* Limits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormRowVertical
                label="Max Students"
                name="features.maxStudents"
                error={errors.features?.maxStudents}
                helperText="0 = unlimited"
              >
                <Input
                  type="number"
                  placeholder="0"
                  value={values.features.maxStudents || ""}
                  onChange={(e) =>
                    setFieldValue("features.maxStudents", parseInt(e.target.value) || 0)
                  }
                  min={0}
                  disabled={isLoading}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Max Teachers"
                name="features.maxTeachers"
                error={errors.features?.maxTeachers}
                helperText="0 = unlimited"
              >
                <Input
                  type="number"
                  placeholder="0"
                  value={values.features.maxTeachers || ""}
                  onChange={(e) =>
                    setFieldValue("features.maxTeachers", parseInt(e.target.value) || 0)
                  }
                  min={0}
                  disabled={isLoading}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Max Campuses"
                name="features.maxCampuses"
                error={errors.features?.maxCampuses}
                helperText="0 = unlimited"
              >
                <Input
                  type="number"
                  placeholder="0"
                  value={values.features.maxCampuses || ""}
                  onChange={(e) =>
                    setFieldValue("features.maxCampuses", parseInt(e.target.value) || 0)
                  }
                  min={0}
                  disabled={isLoading}
                />
              </FormRowVertical>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-text-secondary">Enabled Features</h4>
              
              {[
                { key: "attendance", label: "Attendance Management" },
                { key: "exams", label: "Exams & Results" },
                { key: "fees", label: "Fee Management" },
                { key: "payroll", label: "Payroll Management" },
                { key: "certificates", label: "Certificates" },
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium text-text-primary">{feature.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={values.features[feature.key as keyof typeof values.features] as boolean || false}
                      onChange={(e) =>
                        setFieldValue(`features.${feature.key}`, e.target.checked)
                      }
                      disabled={isLoading}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button fullWidth={true} size="lg" type="submit" loading={isLoading}>
          {!isEditMode ? "Create Plan" : "Update Plan"}
        </Button>
      </div>
    </form>
  );
};

export default PlanForm;

