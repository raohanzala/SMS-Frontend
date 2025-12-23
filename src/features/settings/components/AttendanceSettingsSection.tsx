import { useFormik } from "formik";
import { FiSave } from "react-icons/fi";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Card from "@/components/common/Card";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { useAddSettings } from "../hooks/useAddSettings";
import { Settings } from "../types/settings.types";
import * as Yup from "yup";

interface AttendanceSettingsSectionProps {
  settings: Settings | null;
}

const attendanceSettingsSchema = Yup.object().shape({
  autoMarkAbsentAfter: Yup.number().positive().optional(),
  allowLateEntry: Yup.boolean().optional(),
  lateAfterMinutes: Yup.number().positive().optional(),
});

const AttendanceSettingsSection = ({ settings }: AttendanceSettingsSectionProps) => {
  const { updateSettingsMutation, isUpdatingSettings } = useUpdateSettings();
  const { addSettingsMutation, isAddingSettings } = useAddSettings();
  const isEditMode = !!settings;
  const isLoading = isUpdatingSettings || isAddingSettings;

  const formik = useFormik({
    initialValues: {
      autoMarkAbsentAfter: settings?.attendance?.autoMarkAbsentAfter || 15,
      allowLateEntry: settings?.attendance?.allowLateEntry ?? true,
      lateAfterMinutes: settings?.attendance?.lateAfterMinutes || 10,
    },
    validationSchema: attendanceSettingsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        attendance: {
          autoMarkAbsentAfter: values.autoMarkAbsentAfter,
          allowLateEntry: values.allowLateEntry,
          lateAfterMinutes: values.allowLateEntry ? values.lateAfterMinutes : undefined,
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
      title="Attendance Settings"
      description="Configure automatic attendance marking and late entry rules"
    >
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
        <FormRowVertical
          label="Auto Mark Absent After (minutes)"
          name="autoMarkAbsentAfter"
          error={errors.autoMarkAbsentAfter as string}
        >
          <Input
            type="number"
            min="1"
            placeholder="e.g. 15"
            value={values.autoMarkAbsentAfter}
            onChange={(e) =>
              setFieldValue("autoMarkAbsentAfter", e.target.value ? Number(e.target.value) : 15)
            }
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Automatically mark students as absent if they haven&apos;t been marked present after this many minutes
          </p>
        </FormRowVertical>

        <FormRowVertical
          label="Allow Late Entry"
          name="allowLateEntry"
          error={errors.allowLateEntry as string}
        >
          <div className="flex items-center gap-3 mt-1">
            <input
              type="checkbox"
              id="allowLateEntry"
              checked={values.allowLateEntry}
              onChange={(e) => setFieldValue("allowLateEntry", e.target.checked)}
              disabled={isLoading}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="allowLateEntry" className="text-sm text-gray-700">
              Enable late entry tracking
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            When enabled, students arriving after the specified time will be marked as late
          </p>
        </FormRowVertical>

        {values.allowLateEntry && (
          <FormRowVertical
            label="Late After (minutes)"
            name="lateAfterMinutes"
            error={errors.lateAfterMinutes as string}
          >
            <Input
              type="number"
              min="1"
              placeholder="e.g. 10"
              value={values.lateAfterMinutes}
              onChange={(e) =>
                setFieldValue("lateAfterMinutes", e.target.value ? Number(e.target.value) : 10)
              }
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Students arriving after this many minutes from start time will be marked as late
            </p>
          </FormRowVertical>
        )}

        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            type="submit"
            loading={isLoading || isSubmitting}
            className="flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {isEditMode ? "Update Attendance Settings" : "Save Attendance Settings"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AttendanceSettingsSection;

