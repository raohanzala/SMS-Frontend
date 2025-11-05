import SignupForm from "@/features/authentication/components/SignupForm";
import { FiBookOpen } from "react-icons/fi";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-blue-600 text-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FiBookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">School Management System</h1>
          <p className="text-lg text-blue-100 leading-relaxed">
            Create your account and manage students, teachers, attendance, and results
            in one professional platform. Start simplifying your school&apos;s administration today.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <FiBookOpen className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join our school management system
            </p>
          </div>

          {/* Signup Form */}
          <SignupForm />

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
