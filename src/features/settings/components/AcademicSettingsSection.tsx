import { useFormik } from "formik";
import { FiSave } from "react-icons/fi";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Card from "@/components/common/Card";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { useAddSettings } from "../hooks/useAddSettings";
import { Settings } from "../types/settings.types";
import EntitySelect from "@/components/common/EntitySelect";
import * as Yup from "yup";

interface AcademicSettingsSectionProps {
  settings: Settings | null;
}

const academicSettingsSchema = Yup.object().shape({
  academicYear: Yup.object().shape({
    startDate: Yup.string().optional(),
    endDate: Yup.string().optional(),
  }).optional(),
  gradingSystem: Yup.string().oneOf(["percentage", "gpa", "custom"]).optional(),
  passPercentage: Yup.number().min(0).max(100).optional(),
});

const GRADING_SYSTEMS = [
  { value: "percentage", label: "Percentage" },
  { value: "gpa", label: "GPA (Grade Point Average)" },
  { value: "custom", label: "Custom" },
];

const AcademicSettingsSection = ({ settings }: AcademicSettingsSectionProps) => {
  const { updateSettingsMutation, isUpdatingSettings } = useUpdateSettings();
  const { addSettingsMutation, isAddingSettings } = useAddSettings();
  const isEditMode = !!settings;
  const isLoading = isUpdatingSettings || isAddingSettings;

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (date: string | Date | undefined): string => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().split("T")[0];
  };

  const formik = useFormik({
    initialValues: {
      academicYear: {
        startDate: formatDateForInput(settings?.academic?.academicYear?.startDate),
        endDate: formatDateForInput(settings?.academic?.academicYear?.endDate),
      },
      gradingSystem: settings?.academic?.gradingSystem || "percentage",
      passPercentage: settings?.academic?.passPercentage || 40,
    },
    validationSchema: academicSettingsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        academic: {
          academicYear: {
            startDate: values.academicYear.startDate ? new Date(values.academicYear.startDate) : undefined,
            endDate: values.academicYear.endDate ? new Date(values.academicYear.endDate) : undefined,
          },
          gradingSystem: values.gradingSystem,
          passPercentage: values.passPercentage,
        },
      };

      if (isEditMode) {
        updateSettingsMutation({
          settingsId: settings?._id,
          settingsData: payload,
        });
      } else {
        addSettingsMutation(payload);
      }
    },
  });

  const { errors, values, setFieldValue, handleSubmit, isSubmitting } = formik;

  return (
    <Card
      title="Academic Settings"
      description="Configure rules that affect results, sessions, and academic year"
    >
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormRowVertical
            label="Academic Year Start Date"
            name="academicYear.startDate"
            error={errors.academicYear?.startDate as string}
          >
            <Input
              type="date"
              value={values.academicYear.startDate}
              onChange={(e) =>
                setFieldValue("academicYear.startDate", e.target.value)
              }
              disabled={isLoading}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Academic Year End Date"
            name="academicYear.endDate"
            error={errors.academicYear?.endDate as string}
          >
            <Input
              type="date"
              value={values.academicYear.endDate}
              onChange={(e) =>
                setFieldValue("academicYear.endDate", e.target.value)
              }
              disabled={isLoading}
            />
          </FormRowVertical>
        </div>

        <FormRowVertical
          label="Grading System"
          name="gradingSystem"
          error={errors.gradingSystem}
        >
          <EntitySelect
            entity="static"
            staticOptions={GRADING_SYSTEMS}
            value={values.gradingSystem}
            onChange={(value) => setFieldValue("gradingSystem", value || "percentage")}
            placeholder="Select grading system"
            isDisabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            {values.gradingSystem === "percentage" && "Grades will be shown as percentages (0-100%)"}
            {values.gradingSystem === "gpa" && "Grades will be shown as GPA (0.0-4.0 or similar scale)"}
            {values.gradingSystem === "custom" && "You can define custom grading scales"}
          </p>
        </FormRowVertical>

        <FormRowVertical
          label="Pass Percentage"
          name="passPercentage"
          error={errors.passPercentage as string}
        >
          <Input
            type="number"
            min="0"
            max="100"
            placeholder="e.g. 40"
            value={values.passPercentage}
            onChange={(e) =>
              setFieldValue("passPercentage", e.target.value ? Number(e.target.value) : 0)
            }
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum percentage required to pass (0-100)
          </p>
        </FormRowVertical>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            type="submit"
            loading={isLoading || isSubmitting}
            className="flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {isEditMode ? "Update Academic Settings" : "Save Academic Settings"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AcademicSettingsSection;

