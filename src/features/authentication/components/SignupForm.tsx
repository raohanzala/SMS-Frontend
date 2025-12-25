import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { signupSchema } from "../validation/authentication.validation";

const SignupForm = () => {
  const { signupMutation, isSignupPending } = useSignup();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: signupSchema,
    onSubmit: async (formValues) => {
      signupMutation(formValues);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormRowVertical label="Full Name" name="name">
          <Input
            type="text"
            disabled={formik.isSubmitting}
            placeholder="Enter your full name"
            {...formik.getFieldProps("name")}
          />
        </FormRowVertical>
        <FormRowVertical label="Email Address" name="email">
          <Input
            type="email"
            disabled={formik.isSubmitting}
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
          />
        </FormRowVertical>
        <FormRowVertical label="Password" name="password">
          <Input
            type="password"
            disabled={formik.isSubmitting}
            placeholder="Enter your password"
            {...formik.getFieldProps("password")}
          />
        </FormRowVertical>
        <FormRowVertical label="Confirm Password" name="confirmPassword">
          <Input
            type="password"
            disabled={formik.isSubmitting}
            placeholder="Confirm your password"
            {...formik.getFieldProps("confirmPassword")}
          />
        </FormRowVertical>
        <div>
          <Button
            fullWidth
            type="submit"
            size="lg"
            loading={isSignupPending}
            disabled={isSignupPending}
          >
            Create Account
          </Button>
        </div>

        <div className="text-sm text-center mt-2">
          <span className="text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </span>
        </div>
      </form>
    </FormikProvider>
  );
};

export default SignupForm;
