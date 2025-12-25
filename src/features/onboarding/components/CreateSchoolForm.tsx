import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useCreateSchool } from "../hooks/useCreateSchool";
import { createSchoolSchema } from "../validation/school.validation";
import { Info, School } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const CreateSchoolForm = () => {
  const { createSchoolMutation, isCreatingSchool } = useCreateSchool();

  const { user, permissions, isAuthenticated } = useSelector((state: RootState) => state.auth)
  console.log('USER', user)
  console.log('PERMISSIONS', permissions)
  console.log('IS AUTHENTICATED', isAuthenticated)

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
    },
    validationSchema: createSchoolSchema,
    onSubmit: async (formValues) => {
      const payload: { name: string; code?: string } = {
        name: formValues.name.trim(),
      };
      
      // Only include code if provided
      if (formValues.code && formValues.code.trim()) {
        payload.code = formValues.code.trim().toUpperCase();
      }
      
      createSchoolMutation(payload);
    },
  });

  const { errors, values, getFieldProps, handleSubmit, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info Banner */}
        <div className="bg-accent-cyan bg-opacity-10 border border-accent-cyan border-opacity-30 rounded-lg p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-accent-cyan mt-0.5 flex-shrink-0" />
          <div className="text-sm text-accent-cyanDark">
            <p className="font-medium mb-1">Welcome to your school setup!</p>
            <p>
              Enter your school details below. A unique school code will be automatically generated if you don&apos;t provide one.
            </p>
          </div>
        </div>

        {/* School Name */}
        <FormRowVertical label="School Name" name="name" error={errors.name}>
          <Input
            type="text"
            disabled={isCreatingSchool}
            placeholder="e.g., ABC High School"
            {...getFieldProps("name")}
          />
        </FormRowVertical>

        {/* School Code (Optional) */}
        <FormRowVertical 
          label="School Code (Optional)" 
          name="code" 
          error={errors.code}
        >
          <div>
            <Input
              type="text"
              disabled={isCreatingSchool}
              placeholder="e.g., ABC123 (auto-generated if left empty)"
              value={values.code}
              onChange={(e) => {
                // Convert to uppercase and remove spaces
                const value = e.target.value.toUpperCase().replace(/\s/g, "");
                setFieldValue("code", value);
              }}
              onBlur={getFieldProps("code").onBlur}
            />
            <p className="mt-1 text-xs text-text-tertiary">
              Leave empty to auto-generate a unique code
            </p>
          </div>
        </FormRowVertical>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            fullWidth
            type="submit"
            loading={isCreatingSchool}
            size="lg"
            disabled={isCreatingSchool}
            startIcon={<School className="h-5 w-5" />}
          >
            Create School
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateSchoolForm;
