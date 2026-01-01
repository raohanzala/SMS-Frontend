import { useFormik } from "formik";
import * as Yup from "yup";
import { Settings, Mail, Upload, Calendar } from "lucide-react";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Card from "@/components/common/Card";
import { useSaaSSettings } from "../hooks/useSaaSSettings";
import { useUpdateSaaSSettings } from "../hooks/useUpdateSaaSSettings";

const saaSSettingsSchema = Yup.object().shape({
  maintenanceMode: Yup.boolean(),
  allowRegistrations: Yup.boolean(),
  defaultTrialDays: Yup.number()
    .min(1, "Trial days must be at least 1")
    .max(365, "Trial days cannot exceed 365")
    .required("Default trial days is required"),
  supportEmail: Yup.string()
    .email("Please enter a valid email address")
    .optional(),
  maxFileUploadMB: Yup.number()
    .min(1, "File size must be at least 1 MB")
    .max(1000, "File size cannot exceed 1000 MB")
    .required("Max file upload size is required"),
});

const SaaSSettingsPage = () => {
  const { settings, isSaaSSettingsLoading, saaSSettingsError } = useSaaSSettings();
  const { updateSaaSSettingsMutation, isUpdatingSaaSSettings } = useUpdateSaaSSettings();

  const formik = useFormik({
    initialValues: {
      maintenanceMode: settings?.maintenanceMode ?? false,
      allowRegistrations: settings?.allowRegistrations ?? true,
      defaultTrialDays: settings?.defaultTrialDays ?? 14,
      supportEmail: settings?.supportEmail ?? "",
      maxFileUploadMB: settings?.maxFileUploadMB ?? 10,
    },
    validationSchema: saaSSettingsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateSaaSSettingsMutation({
        maintenanceMode: values.maintenanceMode,
        allowRegistrations: values.allowRegistrations,
        defaultTrialDays: values.defaultTrialDays,
        supportEmail: values.supportEmail || undefined,
        maxFileUploadMB: values.maxFileUploadMB,
      });
    },
  });

  const { errors, values, setFieldValue, handleSubmit, isSubmitting } = formik;
  const isLoading = isUpdatingSaaSSettings || isSubmitting;

  if (isSaaSSettingsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (saaSSettingsError) {
    return (
      <ErrorMessage
        message={saaSSettingsError.message || "Failed to load SaaS settings"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">SaaS Settings</h1>
        <p className="text-sm text-text-secondary">
          Configure global platform settings and system preferences
        </p>
      </div>

      <Card
        title="Platform Configuration"
        description="Manage system-wide settings that affect all schools on the platform"
      >
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Maintenance Mode */}
          <FormRowVertical
            label="Maintenance Mode"
            name="maintenanceMode"
            error={errors.maintenanceMode}
            helperText="When enabled, the platform will be unavailable to all users except super admins"
          >
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.maintenanceMode}
                  onChange={(e) => setFieldValue("maintenanceMode", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-text-primary">
                  {values.maintenanceMode ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
          </FormRowVertical>

          {/* Allow Registrations */}
          <FormRowVertical
            label="Allow Registrations"
            name="allowRegistrations"
            error={errors.allowRegistrations}
            helperText="Control whether new schools can register on the platform"
          >
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.allowRegistrations}
                  onChange={(e) => setFieldValue("allowRegistrations", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-text-primary">
                  {values.allowRegistrations ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
          </FormRowVertical>

          {/* Default Trial Days */}
          <FormRowVertical
            label="Default Trial Days"
            name="defaultTrialDays"
            error={errors.defaultTrialDays}
            helperText="Number of trial days granted to new schools by default"
            icon={<Calendar className="w-4 h-4" />}
            required
          >
            <Input
              type="number"
              placeholder="Enter default trial days"
              value={values.defaultTrialDays}
              onChange={(e) => setFieldValue("defaultTrialDays", parseInt(e.target.value) || 0)}
              min={1}
              max={365}
            />
          </FormRowVertical>

          {/* Support Email */}
          <FormRowVertical
            label="Support Email"
            name="supportEmail"
            error={errors.supportEmail}
            helperText="Email address for platform support inquiries"
            icon={<Mail className="w-4 h-4" />}
          >
            <Input
              type="email"
              placeholder="support@example.com"
              value={values.supportEmail}
              onChange={(e) => setFieldValue("supportEmail", e.target.value)}
            />
          </FormRowVertical>

          {/* Max File Upload Size */}
          <FormRowVertical
            label="Max File Upload Size (MB)"
            name="maxFileUploadMB"
            error={errors.maxFileUploadMB}
            helperText="Maximum file size allowed for uploads across the platform (in megabytes)"
            icon={<Upload className="w-4 h-4" />}
            required
          >
            <Input
              type="number"
              placeholder="Enter max file size in MB"
              value={values.maxFileUploadMB}
              onChange={(e) => setFieldValue("maxFileUploadMB", parseInt(e.target.value) || 0)}
              min={1}
              max={1000}
            />
          </FormRowVertical>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              type="submit"
              loading={isLoading}
              icon={<Settings className="w-4 h-4" />}
            >
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SaaSSettingsPage;

