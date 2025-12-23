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

interface BrandingSettingsSectionProps {
  settings: Settings | null;
}

const brandingSettingsSchema = Yup.object().shape({
  logo: Yup.string().url().optional(),
  primaryColor: Yup.string().optional(),
  secondaryColor: Yup.string().optional(),
  theme: Yup.string().oneOf(["light", "dark"]).optional(),
});

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const BrandingSettingsSection = ({ settings }: BrandingSettingsSectionProps) => {
  const { updateSettingsMutation, isUpdatingSettings } = useUpdateSettings();
  const { addSettingsMutation, isAddingSettings } = useAddSettings();
  const isEditMode = !!settings;
  const isLoading = isUpdatingSettings || isAddingSettings;

  const formik = useFormik({
    initialValues: {
      logo: settings?.branding?.logo || "",
      primaryColor: settings?.branding?.primaryColor || "",
      secondaryColor: settings?.branding?.secondaryColor || "",
      theme: settings?.branding?.theme || "light",
    },
    validationSchema: brandingSettingsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        branding: {
          logo: values.logo || undefined,
          primaryColor: values.primaryColor || undefined,
          secondaryColor: values.secondaryColor || undefined,
          theme: values.theme,
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
      title="Branding Settings"
      description="Customize your school's visual identity and theme"
    >
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
        <FormRowVertical label="Logo URL" name="logo" error={errors.logo}>
          <Input
            type="url"
            placeholder="https://example.com/logo.png"
            value={values.logo}
            onChange={(e) => setFieldValue("logo", e.target.value)}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the URL of your school logo image
          </p>
        </FormRowVertical>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormRowVertical
            label="Primary Color"
            name="primaryColor"
            error={errors.primaryColor}
          >
            <div className="flex items-center gap-3 mt-1">
              <Input
                type="text"
                placeholder="#3B82F6"
                value={values.primaryColor}
                onChange={(e) => setFieldValue("primaryColor", e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <input
                type="color"
                value={values.primaryColor || "#3B82F6"}
                onChange={(e) => setFieldValue("primaryColor", e.target.value)}
                disabled={isLoading}
                className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Main brand color (hex format)
            </p>
          </FormRowVertical>

          <FormRowVertical
            label="Secondary Color"
            name="secondaryColor"
            error={errors.secondaryColor}
          >
            <div className="flex items-center gap-3 mt-1">
              <Input
                type="text"
                placeholder="#10B981"
                value={values.secondaryColor}
                onChange={(e) => setFieldValue("secondaryColor", e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <input
                type="color"
                value={values.secondaryColor || "#10B981"}
                onChange={(e) => setFieldValue("secondaryColor", e.target.value)}
                disabled={isLoading}
                className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Secondary brand color (hex format)
            </p>
          </FormRowVertical>
        </div>

        <FormRowVertical label="Theme" name="theme" error={errors.theme}>
          <EntitySelect
            entity="static"
            staticOptions={THEMES}
            value={values.theme}
            onChange={(value) => setFieldValue("theme", value || "light")}
            placeholder="Select theme"
            isDisabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Choose the default theme for your school portal
          </p>
        </FormRowVertical>

        {/* Live Preview */}
        {(values.primaryColor || values.secondaryColor) && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
            <div className="flex items-center gap-4">
              <div
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: values.primaryColor || "#3B82F6" }}
              >
                Primary Color
              </div>
              <div
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: values.secondaryColor || "#10B981" }}
              >
                Secondary Color
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            type="submit"
            loading={isLoading || isSubmitting}
            className="flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {isEditMode ? "Update Branding Settings" : "Save Branding Settings"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BrandingSettingsSection;

