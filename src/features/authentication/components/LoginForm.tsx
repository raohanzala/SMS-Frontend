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
    { email: 'shaman@gmail.com', password: 'Sh@man123', role : 'student' },
    { email: 'sohail@gmail.com', password: 'Soh@il123', role : 'teacher' },
    { email: 'asghar@gmail.com', password: 'Asgh@r123', role : 'parent' },
    { email: 'zafar@gmail.com', password: 'Z@far123', role : 'staff' },
    { email: 'zohaib@gmail.com', password: 'Zoh@ib123', role : 'admnin' },
    { email: 'ashraf@gmail.com', password: 'ashraf', role : 'school_owner' },
    { email: 'akhtar@gmail.com', password: 'akhtar123', role : 'super_admin' },
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

          <div className='mt-4 space-y-2'>
            {
              demoCredentials.map((credential) => (
                <div className='text-sm text-text-secondary hover:text-primary cursor-pointer' key={credential.email} onClick={() => fillDemoCredentials(credential)}>
                  {credential.email} - {credential.role}
                </div>
              ))
            }
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default LoginForm;
