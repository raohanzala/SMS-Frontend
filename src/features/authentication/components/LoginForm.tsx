import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../validation/authentication.validation';

const LoginForm = () => {
  const { loginMutation, isLoginPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (formValues) => {
      loginMutation(formValues)
    },
  })

  const demoCredentials = [
    { email: 'saleem@gmail.com', password: 'saleem1234', role: 'Admin' },
    { email: 'kamal@gmail.com', password: 'kamal1234', role: 'Teacher' },
    { email: 'salman@gmail.com', password: 'salman1234', role: 'Student' },
    { email: 'akhtar@gmail.com', password: 'akhtar123', role: 'Parent' },
  ];

  const fillDemoCredentials = (credentials: { email: string; password: string }) => {
    formik.setValues({
      email: credentials.email,
      password: credentials.password,
    });
  };

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>

          {/* Email */}
          <div className='mb-3'>
            <FormRowVertical label="Email address" name='email'>
              <Input
                type="email"
                disabled={formik.isSubmitting}
                placeholder="Enter your email"
                {...formik.getFieldProps('email')}
              />
            </FormRowVertical>
          </div>

          {/* Password */}
          <FormRowVertical label="Password" name='password'>
            <Input
              type="password"
              disabled={formik.isSubmitting}
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
            />
          </FormRowVertical>


          {/* Submit */}
          <div className='mt-6'>
            <Button fullWidth={true} type='submit' size='lg' loading={isLoginPending} disabled={isLoginPending}>
              Sign in
            </Button>
          </div>

          <div className="flex justify-between items-center text-sm mt-4">
            <Link to="/forgot-password" className="text-primary hover:text-primary-dark transition-colors">
              Forgot password?
            </Link>
            <span className="text-text-secondary">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-primary hover:text-primary-dark transition-colors font-medium">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default LoginForm;
