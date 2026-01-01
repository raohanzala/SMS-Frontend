import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import Modal from "@/components/common/Modal";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import EntitySelect from "@/components/common/EntitySelect";
import { AssignPlanInput } from "../types/subscriptions.types";
import { usePlans } from "@/features/plans/hooks/usePlans";
import { useQuery } from "@tanstack/react-query";
import { getAllSchoolsApi } from "@/api/schools";
import { Building2, CreditCard, Calendar, Clock } from "lucide-react";

interface AssignPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AssignPlanInput) => void;
  isSubmitting?: boolean;
  preselectedSchoolId?: string;
}

const assignPlanSchema = Yup.object().shape({
  schoolId: Yup.string().required("School is required"),
  planId: Yup.string().required("Plan is required"),
  startDate: Yup.string().optional(),
  endDate: Yup.string().optional(),
  isTrial: Yup.boolean().optional(),
});

const AssignPlanModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  preselectedSchoolId,
}: AssignPlanModalProps) => {
  const { plans } = usePlans(true); // Fetch active plans only

  // Fetch schools for dropdown
  const { data: schoolsData } = useQuery({
    queryKey: ["schools", "all"],
    queryFn: () => getAllSchoolsApi({ page: 1, limit: 100 }),
  });

  const planOptions = useMemo(() => {
    return plans.map((plan) => ({
      value: plan._id,
      label: `${plan.name} - ${plan.price} ${plan.currency}/${plan.billingCycle.toLowerCase()}`,
    }));
  }, [plans]);

  const schoolOptions = useMemo(() => {
    const schools = schoolsData?.data?.schools || [];
    return schools.map((school) => ({
      value: school._id,
      label: `${school.name} (${school.code})`,
    }));
  }, [schoolsData]);

  const formik = useFormik({
    initialValues: {
      schoolId: preselectedSchoolId || "",
      planId: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      isTrial: false,
    },
    validationSchema: assignPlanSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const assignData: AssignPlanInput = {
        schoolId: values.schoolId,
        planId: values.planId,
        ...(values.startDate && { startDate: new Date(values.startDate).toISOString() }),
        ...(values.endDate && { endDate: new Date(values.endDate).toISOString() }),
        ...(values.isTrial && { isTrial: values.isTrial }),
      };
      onSubmit(assignData);
    },
  });

  const { errors, values, setFieldValue, handleSubmit } = formik;

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Plan to School"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* School Selection */}
        <FormRowVertical
          label="School"
          name="schoolId"
          error={errors.schoolId}
          required
          icon={<Building2 className="inline w-4 h-4" />}
        >
          <EntitySelect
            entity="static"
            value={values.schoolId}
            onChange={(value) =>
              setFieldValue("schoolId", Array.isArray(value) ? value[0] || "" : value || "")
            }
            placeholder="Select school"
            isDisabled={isSubmitting || !!preselectedSchoolId}
            staticOptions={schoolOptions}
          />
        </FormRowVertical>

        {/* Plan Selection */}
        <FormRowVertical
          label="Subscription Plan"
          name="planId"
          error={errors.planId}
          required
          icon={<CreditCard className="inline w-4 h-4" />}
        >
          <EntitySelect
            entity="static"
            value={values.planId}
            onChange={(value) =>
              setFieldValue("planId", Array.isArray(value) ? value[0] || "" : value || "")
            }
            placeholder="Select plan"
            isDisabled={isSubmitting}
            staticOptions={planOptions}
          />
        </FormRowVertical>

        {/* Trial Toggle */}
        <FormRowVertical
          label="Trial Period"
          name="isTrial"
          error={errors.isTrial}
          helperText="Enable trial period (default trial days from SaaS settings)"
          icon={<Clock className="inline w-4 h-4" />}
        >
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={values.isTrial}
                onChange={(e) => setFieldValue("isTrial", e.target.checked)}
                disabled={isSubmitting}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ml-3 text-sm font-medium text-text-primary">
                {values.isTrial ? "Trial Enabled" : "Regular Subscription"}
              </span>
            </label>
          </div>
        </FormRowVertical>

        {/* Start Date */}
        <FormRowVertical
          label="Start Date"
          name="startDate"
          error={errors.startDate}
          helperText="Optional. Defaults to today if not provided"
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <Input
            type="date"
            value={values.startDate}
            onChange={(e) => setFieldValue("startDate", e.target.value)}
            disabled={isSubmitting}
          />
        </FormRowVertical>

        {/* End Date - Only show if not trial */}
        {!values.isTrial && (
          <FormRowVertical
            label="End Date"
            name="endDate"
            error={errors.endDate}
            helperText="Optional. Defaults to 1 month from start date if not provided"
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <Input
              type="date"
              value={values.endDate}
              onChange={(e) => setFieldValue("endDate", e.target.value)}
              disabled={isSubmitting}
              min={values.startDate}
            />
          </FormRowVertical>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Assign Plan
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignPlanModal;

