import SignupForm from "@/features/authentication/components/SignupForm";
import { FiBookOpen } from "react-icons/fi";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen bg-bg-secondary">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-primary text-text-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-bg-main bg-opacity-20 rounded-full flex items-center justify-center">
              <FiBookOpen className="h-8 w-8 text-text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">School Management System</h1>
          <p className="text-lg text-text-white text-opacity-90 leading-relaxed">
            Create your account and manage students, teachers, attendance, and results
            in one professional platform. Start simplifying your school&apos;s administration today.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-bg-main p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-primary rounded-full flex items-center justify-center mb-4">
              <FiBookOpen className="h-7 w-7 text-text-white" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Create School Owner Account</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Sign up to create and manage your school
            </p>
          </div>

          {/* Signup Form */}
          <SignupForm />

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-text-tertiary">
            © {new Date().getFullYear()} School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
