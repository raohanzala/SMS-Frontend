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
          <div>
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
          <div>
            <Button fullWidth={true} type='submit' loading={isLoginPending} disabled={isLoginPending}>
              Sign in
            </Button>
          </div>

          <div className="flex justify-between items-center text-sm mt-2">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <span className="text-gray-500">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </FormikProvider>
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h3>
        <div className="grid grid-cols-2 gap-2">
          {demoCredentials.map((cred, index) => (
            <button
              key={index}
              onClick={() => fillDemoCredentials(cred)}
              className="text-xs p-2 bg-gray-100 hover:bg-gray-200 rounded border text-left"
            >
              <div className="font-medium">{cred.role}</div>
              <div className="text-gray-600">{cred.email}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
