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

interface GeneralSettingsSectionProps {
  settings: Settings | null;
}

const generalSettingsSchema = Yup.object().shape({
  schoolName: Yup.string().optional(),
  timezone: Yup.string().optional(),
  locale: Yup.string().optional(),
  workingDays: Yup.array().of(Yup.string()).optional(),
  weekendDays: Yup.array().of(Yup.string()).optional(),
});

const TIMEZONES = [
  { value: "Asia/Karachi", label: "Asia/Karachi (PKT)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { value: "UTC", label: "UTC" },
];

const LOCALES = [
  { value: "en-PK", label: "English (Pakistan)" },
  { value: "ur-PK", label: "Urdu (Pakistan)" },
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
];

const WEEK_DAYS = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const GeneralSettingsSection = ({ settings }: GeneralSettingsSectionProps) => {
  const { updateSettingsMutation, isUpdatingSettings } = useUpdateSettings();
  const { addSettingsMutation, isAddingSettings } = useAddSettings();
  const isEditMode = !!settings;
  const isLoading = isUpdatingSettings || isAddingSettings;

  const formik = useFormik({
    initialValues: {
      schoolName: settings?.general?.schoolName || "",
      timezone: settings?.general?.timezone || "Asia/Karachi",
      locale: settings?.general?.locale || "en-PK",
      workingDays: settings?.general?.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      weekendDays: settings?.general?.weekendDays || ["Saturday", "Sunday"],
    },
    validationSchema: generalSettingsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        general: {
          schoolName: values.schoolName || undefined,
          timezone: values.timezone,
          locale: values.locale,
          workingDays: values.workingDays,
          weekendDays: values.weekendDays,
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
      title="General Settings"
      description="Configure basic school identity and localization settings"
    >
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
        <FormRowVertical label="School Name" name="schoolName" error={errors.schoolName}>
          <Input
            type="text"
            placeholder="Enter school name"
            value={values.schoolName}
            onChange={(e) => setFieldValue("schoolName", e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>

        <FormRowVertical label="Timezone" name="timezone" error={errors.timezone}>
          <EntitySelect
            entity="static"
            staticOptions={TIMEZONES}
            value={values.timezone}
            onChange={(value) => setFieldValue("timezone", value || "Asia/Karachi")}
            placeholder="Select timezone"
            isDisabled={isLoading}
          />
        </FormRowVertical>

        <FormRowVertical label="Language / Locale" name="locale" error={errors.locale}>
          <EntitySelect
            entity="static"
            staticOptions={LOCALES}
            value={values.locale}
            onChange={(value) => setFieldValue("locale", value || "en-PK")}
            placeholder="Select locale"
            isDisabled={isLoading}
          />
        </FormRowVertical>

        <FormRowVertical label="Working Days" name="workingDays" error={errors.workingDays as string}>
          <EntitySelect
            entity="static"
            staticOptions={WEEK_DAYS}
            value={values.workingDays}
            onChange={(value) => {
              const days = Array.isArray(value) ? value : [value].filter(Boolean);
              setFieldValue("workingDays", days);
            }}
            isMulti={true}
            placeholder="Select working days"
            isDisabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Select the days when school is operational
          </p>
        </FormRowVertical>

        <FormRowVertical label="Weekend Days" name="weekendDays" error={errors.weekendDays as string}>
          <EntitySelect
            entity="static"
            staticOptions={WEEK_DAYS}
            value={values.weekendDays}
            onChange={(value) => {
              const days = Array.isArray(value) ? value : [value].filter(Boolean);
              setFieldValue("weekendDays", days);
            }}
            isMulti={true}
            placeholder="Select weekend days"
            isDisabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Select the days when school is closed
          </p>
        </FormRowVertical>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            type="submit"
            loading={isLoading || isSubmitting}
            className="flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {isEditMode ? "Update General Settings" : "Save General Settings"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default GeneralSettingsSection;

