import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import FormRowVertical from '../../components/common/FormRowVerticle';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useChangePassword } from './useChangePassword';

const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/\d/, 'Must contain a number')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ChangePasswordForm = () => {

  const { changePassword, isPending } = useChangePassword()

  const formik = useFormik({
    initialValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        toast.success('Password changed successfully!');
        resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to change password');
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormRowVertical label="Current Password" name="currentPassword">
          <Input
            type="password"
            id="currentPassword"
            name="currentPassword"
            disabled={formik.isSubmitting}
            placeholder="Enter your current password"
            {...formik.getFieldProps('currentPassword')}
          />
        </FormRowVertical>

        <FormRowVertical label="New Password" name="newPassword">
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            disabled={formik.isSubmitting}
            placeholder="Enter your new password"
            {...formik.getFieldProps('newPassword')}
          />
        </FormRowVertical>

        <FormRowVertical label="Confirm New Password" name="confirmPassword">
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            disabled={formik.isSubmitting}
            placeholder="Confirm your new password"
            {...formik.getFieldProps('confirmPassword')}
          />
        </FormRowVertical>

        <div>
          <Button fullWidth type="submit" loading={isPending} disabled={isPending}>
            Change Password
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ChangePasswordForm;
