import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useSetPassword } from "../hooks/useSetPassword";
import { setPasswordSchema } from "../validation/authentication.validation";
import { Lock } from "lucide-react";

interface SetPasswordFormProps {
  token: string;
}

const SetPasswordForm = ({ token }: SetPasswordFormProps) => {
  const { setPasswordMutation, isSetPasswordPending } = useSetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: setPasswordSchema,
    onSubmit: async (values) => {
      setPasswordMutation({
        token,
        password: values.password,
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormRowVertical label="New Password" name="password">
          <Input
            type="password"
            disabled={formik.isSubmitting || isSetPasswordPending}
            placeholder="Enter your new password"
            {...formik.getFieldProps("password")}
          />
          <p className="mt-1 text-xs text-text-tertiary">
            Must be at least 8 characters with uppercase, lowercase, and number
          </p>
        </FormRowVertical>

        <FormRowVertical label="Confirm Password" name="confirmPassword">
          <Input
            type="password"
            disabled={formik.isSubmitting || isSetPasswordPending}
            placeholder="Confirm your new password"
            {...formik.getFieldProps("confirmPassword")}
          />
        </FormRowVertical>

        <div>
          <Button
            fullWidth
            type="submit"
            size="lg"
            loading={isSetPasswordPending}
            disabled={isSetPasswordPending}
            startIcon={<Lock className="h-5 w-5" />}
          >
            Set Password & Activate Account
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default SetPasswordForm;

