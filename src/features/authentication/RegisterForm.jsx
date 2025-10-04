import { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { registerSchema } from '@/validations/validationSchemas';
import { useSignup } from './useSignup';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, isPending } = useSignup()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      signup(values)
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormRowVertical label="Full Name" name="name">
          <Input
            type="text"
            id="name"
            name="name"
            disabled={formik.isSubmitting}
            placeholder="Enter your full name"
            {...formik.getFieldProps('name')}
          />
        </FormRowVertical>
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
        <FormRowVertical label="Role" name="role">
          <select
            id="role"
            name="role"
            className={`block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${formik.touched.role && formik.errors.role ? 'border-red-300' : 'border-gray-300'}`}
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('role')}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
          </select>
        </FormRowVertical>
        <FormRowVertical label="Password" name="password">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            disabled={formik.isSubmitting}
            placeholder="Enter your password"
            icon={showPassword ? 'eye-off' : 'eye'}
            iconPosition="right"
            onIconClick={() => setShowPassword((prev) => !prev)}
            {...formik.getFieldProps('password')}
          />
        </FormRowVertical>
        <FormRowVertical label="Confirm Password" name="confirmPassword">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            disabled={formik.isSubmitting}
            placeholder="Confirm your password"
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            iconPosition="right"
            onIconClick={() => setShowConfirmPassword((prev) => !prev)}
            {...formik.getFieldProps('confirmPassword')}
          />
        </FormRowVertical>
        <div>
          <Button fullWidth type="submit" loading={isPending} disabled={isPending}>
            Create Account
          </Button>
        </div>

        {/* Navigation Links */}
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

export default RegisterForm; 