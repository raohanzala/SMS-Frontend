import { FormikProvider, useFormik } from 'formik';
import toast from 'react-hot-toast';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { forgotPasswordSchema } from '../validation/authentication.validation';


const ForgotPasswordForm = () => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Password reset link sent to your email!');
        resetForm();
      } catch (error) {
        toast.error('Failed to send reset link. Please try again.');
      }
    },
  });

  const { errors, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormRowVertical label="Email Address" name="email" error={errors.email}>
          <Input
            type="email"
            placeholder="Enter your email"
            {...getFieldProps('email')}
          />
        </FormRowVertical>
        <div>
          <Button fullWidth type="submit" loading={formik.isSubmitting} disabled={formik.isSubmitting}>
            Send Reset Link
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ForgotPasswordForm; 