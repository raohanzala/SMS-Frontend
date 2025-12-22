import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CreateSchoolForm from "../components/CreateSchoolForm";
import {  FiCheckCircle } from "react-icons/fi";

const CreateSchoolPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // Redirect if user is not a school owner or already has a school
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "school_owner") {
      navigate("/login");
      return;
    }

    // If user already has a schoolId, redirect to dashboard
    if (user.schoolId) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  if (!user || user.role !== "school_owner") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary via-bg-main to-bg-tertiary">
      <div className="flex min-h-screen">
        {/* Left Side - Branding & Steps */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-accent-cyan text-text-white items-center justify-center p-12">
          <div className="max-w-md">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-bg-main bg-opacity-20 flex items-center justify-center">
                    <FiCheckCircle className="h-6 w-6 text-text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-text-white text-opacity-70">Step 1</p>
                    <p className="font-medium text-text-white">Account Created</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-bg-main flex items-center justify-center">
                    {/* <FiSchool className="h-6 w-6 text-primary" /> */}
                  </div>
                  <div>
                    <p className="text-sm text-text-white text-opacity-70">Step 2</p>
                    <p className="font-medium text-text-white">Create Your School</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-bg-main bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  {/* <FiSchool className="h-10 w-10 text-text-white" /> */}
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-text-white">Set Up Your School</h1>
              <p className="text-lg text-text-white text-opacity-90 leading-relaxed">
                You&apos;re almost there! Create your school profile to start managing students, 
                teachers, and all aspects of your educational institution.
              </p>
            </div>

            {/* Features List */}
            <div className="mt-12 space-y-4">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-5 w-5 text-accent-teal mt-0.5 flex-shrink-0" />
                <p className="text-text-white text-opacity-90">Manage students and classes</p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-5 w-5 text-accent-teal mt-0.5 flex-shrink-0" />
                <p className="text-text-white text-opacity-90">Track attendance and results</p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-5 w-5 text-accent-teal mt-0.5 flex-shrink-0" />
                <p className="text-text-white text-opacity-90">Organize timetables and schedules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Create School Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                {/* <FiSchool className="h-8 w-8 text-text-white" /> */}
              </div>
              <h2 className="text-3xl font-bold text-text-primary">Create Your School</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Complete your school setup
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary">Create Your School</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Complete your school setup to get started
              </p>
            </div>

            {/* Create School Form */}
            <div className="bg-bg-main rounded-2xl shadow-xl p-8 border border-border">
              <CreateSchoolForm />
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-text-tertiary">
              © {new Date().getFullYear()} School Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchoolPage;

