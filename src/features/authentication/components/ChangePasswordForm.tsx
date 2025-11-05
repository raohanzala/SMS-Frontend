import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useChangePassword } from "../hooks/useChangePassword";
import { changePasswordSchema } from "../validation/authentication.validation";

const ChangePasswordForm = () => {
  const { changePasswordMutation, isChangePasswordPending } = useChangePassword();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      changePasswordMutation({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormRowVertical label="Current Password" name="currentPassword">
          <Input
            type="password"
            disabled={formik.isSubmitting}
            placeholder="Enter your current password"
            {...formik.getFieldProps("currentPassword")}
          />
        </FormRowVertical>

        <FormRowVertical label="New Password" name="newPassword">
          <Input
            type="password"
            disabled={formik.isSubmitting}
            placeholder="Enter your new password"
            {...formik.getFieldProps("newPassword")}
          />
        </FormRowVertical>

        <FormRowVertical label="Confirm New Password" name="confirmPassword">
          <Input
            type="password"
            disabled={formik.isSubmitting}
            placeholder="Confirm your new password"
            {...formik.getFieldProps("confirmPassword")}
          />
        </FormRowVertical>

        <div>
          <Button
            fullWidth
            type="submit"
            loading={isChangePasswordPending}
            disabled={isChangePasswordPending}
          >
            Change Password
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ChangePasswordForm;
