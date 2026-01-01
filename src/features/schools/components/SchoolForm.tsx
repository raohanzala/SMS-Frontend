import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import Modal from "@/components/common/Modal";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import EntitySelect from "@/components/common/EntitySelect";
import { School, CreateSchoolInput, UpdateSchoolInput } from "../types/schools.types";
import { usePlans } from "@/features/plans/hooks/usePlans";
import { Building, CreditCard } from "lucide-react";

interface SchoolFormProps {
  schoolToEdit?: School | null;
  onClose: () => void;
  onSubmit: (data: CreateSchoolInput | UpdateSchoolInput) => void;
  isSubmitting?: boolean;
}

const schoolSchema = Yup.object().shape({
  name: Yup.string().required("School name is required").trim(),
  code: Yup.string().optional(),
  planId: Yup.string().optional(),
});

const SchoolForm = ({ schoolToEdit, onClose, onSubmit, isSubmitting = false }: SchoolFormProps) => {
  const isEditMode = !!schoolToEdit;
  const { plans } = usePlans(true); // Fetch active plans only

  const planOptions = useMemo(() => {
    return plans.map((plan) => ({
      value: plan._id,
      label: `${plan.name} - ${plan.price} ${plan.currency}/${plan.billingCycle.toLowerCase()}`,
    }));
  }, [plans]);

  const formik = useFormik({
    initialValues: {
      name: schoolToEdit?.name || "",
      code: schoolToEdit?.code || "",
      planId: schoolToEdit?.plan || "",
    },
    validationSchema: schoolSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (isEditMode) {
        const updateData: UpdateSchoolInput = {
          name: values.name.trim(),
          ...(values.planId && { plan: values.planId }),
        };
        onSubmit(updateData);
      } else {
        const createData: CreateSchoolInput = {
          name: values.name.trim(),
          ...(values.code && { code: values.code.trim().toUpperCase() }),
          ...(values.planId && { planId: values.planId }),
        };
        onSubmit(createData);
      }
    },
  });

  const { errors, values, setFieldValue, handleSubmit } = formik;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditMode ? "Edit School" : "Create School"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* School Name */}
        <FormRowVertical
          label="School Name"
          name="name"
          error={errors.name}
          required
          icon={<Building className="inline w-4 h-4" />}
        >
          <Input
            type="text"
            placeholder="Enter school name"
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            disabled={isSubmitting}
          />
        </FormRowVertical>

        {/* School Code - Only for create */}
        {!isEditMode && (
          <FormRowVertical
            label="School Code"
            name="code"
            error={errors.code}
            helperText="Optional. If not provided, a code will be auto-generated"
            icon={<Building className="inline w-4 h-4" />}
          >
            <Input
              type="text"
              placeholder="Enter school code (e.g., ABC123)"
              value={values.code}
              onChange={(e) => setFieldValue("code", e.target.value.toUpperCase())}
              disabled={isSubmitting}
            />
          </FormRowVertical>
        )}

        {/* Plan Selection */}
        <FormRowVertical
          label="Subscription Plan"
          name="planId"
          error={errors.planId}
          icon={<CreditCard className="inline w-4 h-4" />}
          helperText="Select a subscription plan for this school"
        >
          <EntitySelect
            entity="static"
            value={values.planId}
            onChange={(value) =>
              setFieldValue("planId", Array.isArray(value) ? value[0] || "" : value || "")
            }
            placeholder="Select plan (optional)"
            isDisabled={isSubmitting}
            staticOptions={planOptions}
          />
        </FormRowVertical>

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
            {isEditMode ? "Update School" : "Create School"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SchoolForm;

