import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

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

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormRowVertical label="Email Address" name="email">
          <Input
            type="email"
            id="email"
            name="email"
            disabled={formik.isSubmitting}
            placeholder="Enter your email"
            {...formik.getFieldProps('email')}
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