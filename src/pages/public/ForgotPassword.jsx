import React from "react";
import { FiBookOpen, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "@/features/authentication/ForgotPasswordForm";

const ForgotPassword = () => {
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
            Forgot your password? No problem. Enter your email to get a secure reset link
            and regain access to your school management account.
          </p>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <FiBookOpen className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email and we will send you a password reset link.
            </p>
          </div>

          {/* Forgot Password Form */}
          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
