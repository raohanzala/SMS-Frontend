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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding & Steps */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-12">
          <div className="max-w-md">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <FiCheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Step 1</p>
                    <p className="font-medium">Account Created</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    {/* <FiSchool className="h-6 w-6 text-blue-600" /> */}
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Step 2</p>
                    <p className="font-medium">Create Your School</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  {/* <FiSchool className="h-10 w-10 text-white" /> */}
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Set Up Your School</h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                You're almost there! Create your school profile to start managing students, 
                teachers, and all aspects of your educational institution.
              </p>
            </div>

            {/* Features List */}
            <div className="mt-12 space-y-4">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                <p className="text-blue-100">Manage students and classes</p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                <p className="text-blue-100">Track attendance and results</p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                <p className="text-blue-100">Organize timetables and schedules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Create School Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                {/* <FiSchool className="h-8 w-8 text-white" /> */}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Create Your School</h2>
              <p className="mt-2 text-sm text-gray-600">
                Complete your school setup
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create Your School</h2>
              <p className="mt-2 text-sm text-gray-600">
                Complete your school setup to get started
              </p>
            </div>

            {/* Create School Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <CreateSchoolForm />
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} School Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchoolPage;

