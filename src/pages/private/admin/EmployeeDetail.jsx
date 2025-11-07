import { useParams, useNavigate } from "react-router-dom";
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiUser, FiBriefcase, FiCalendar, FiDollarSign, FiBookOpen, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useEmployee } from "@/features/employees/hooks/useEmployee";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/common/Button";

function EmployeeDetail() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { employee, isEmployeeLoading, employeeError } = useEmployee(employeeId);

  if (isEmployeeLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (employeeError) {
    return (
      <ErrorMessage
        message={employeeError.message || "Failed to load employee"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FiXCircle className="text-red-500 text-5xl mb-4" />
        <p className="text-lg text-gray-600">Employee not found.</p>
      </div>
    );
  }

  const displayName = employee.name || employee.email?.split("@")[0] || "Employee";
  const initials = displayName.charAt(0).toUpperCase();
  const designationLabel = employee.designation ? employee.designation.charAt(0).toUpperCase() + employee.designation.slice(1) : "N/A";
  const genderLabel = employee.gender ? employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1) : "N/A";
  const roleLabel = employee.role ? employee.role.charAt(0).toUpperCase() + employee.role.slice(1) : "N/A";

  const InfoItem = ({ icon: Icon, label, value, className = "" }) => (
    <div className={`flex items-start gap-3 ${className}`}>
      <Icon className="text-gray-400 mt-1 flex-shrink-0" size={18} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-900 break-words">{value || <span className="text-gray-400 italic">Not provided</span>}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Profile Image/Avatar */}
              <div className="relative">
                {employee.profileImage ? (
                  <img
                    src={employee.profileImage}
                    alt={displayName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-3xl font-bold text-indigo-600">{initials}</span>
                  </div>
                )}
                {employee.isFirstLogin && (
                  <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1.5 border-2 border-white">
                    <FiClock className="text-yellow-900" size={12} />
                  </div>
                )}
              </div>

              {/* Employee Info */}
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <FiMail size={16} />
                    <span className="text-indigo-100">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
                      {designationLabel}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {roleLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => navigate(`/admin/employees/${employeeId}/edit`)}
              startIcon={<FiEdit2 size={16} />}
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Edit Employee
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiUser className="text-indigo-600" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={FiMail} label="Email" value={employee.email} />
              <InfoItem icon={FiPhone} label="Phone" value={employee.phone} />
              <InfoItem icon={FiMapPin} label="Address" value={employee.address} className="md:col-span-2" />
              <InfoItem icon={FiUser} label="Gender" value={genderLabel} />
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiBriefcase className="text-indigo-600" />
              Professional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={FiBriefcase} label="Designation" value={designationLabel} />
              <InfoItem icon={FiUser} label="Role" value={roleLabel} />
              <InfoItem icon={FiBookOpen} label="Experience" value={employee.experience} className="md:col-span-2" />
              <InfoItem icon={FiBookOpen} label="Education" value={employee.education} className="md:col-span-2" />
              <InfoItem icon={FiCalendar} label="Date of Joining" value={employee.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null} />
              {employee.husband && (
                <InfoItem icon={FiUser} label="Husband Name" value={employee.husband} />
              )}
            </div>
          </div>

          {/* Assigned Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiBookOpen className="text-indigo-600" />
              Assigned Classes
            </h2>
            {employee.assignedClasses && employee.assignedClasses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {employee.assignedClasses.map((cls) => {
                  const className = typeof cls === "string" ? cls : cls.name;
                  const classId = typeof cls === "string" ? cls : cls._id;
                  return (
                    <span
                      key={classId}
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                    >
                      {className}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FiBookOpen className="mx-auto mb-2 text-gray-300" size={32} />
                <p>No classes assigned</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Salary Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiDollarSign className="text-green-600" />
              Salary Information
            </h2>
            {employee.salary ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Monthly Salary</p>
                  <p className="text-2xl font-bold text-green-700">
                    {employee.salary.amount?.toLocaleString() || "0"} {employee.salary.currency || "PKR"}
                  </p>
                </div>
                {employee.salary.paymentHistory && employee.salary.paymentHistory.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Payment History</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {employee.salary.paymentHistory.map((payment, idx) => (
                        <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          {payment.date && new Date(payment.date).toLocaleDateString()} - {payment.amount} {payment.currency || "PKR"}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">Salary information not available</p>
            )}
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiCheckCircle className="text-blue-600" />
              Account Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">First Login</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${employee.isFirstLogin ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {employee.isFirstLogin ? 'Pending' : 'Completed'}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <InfoItem icon={FiClock} label="Created" value={employee.createdAt ? new Date(employee.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null} className="mb-3" />
                <InfoItem icon={FiClock} label="Last Updated" value={employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button
                onClick={() => navigate(`/admin/employees/${employeeId}/edit`)}
                fullWidth
                startIcon={<FiEdit2 size={16} />}
              >
                Edit Employee
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;

