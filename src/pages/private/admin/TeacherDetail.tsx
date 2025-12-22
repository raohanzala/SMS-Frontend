import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTeacher } from "@/features/teachers/hooks/useTeacher";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiDollarSign,
  FiBookOpen,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiEdit2,
  FiArrowLeft
} from "react-icons/fi";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/common/Button";

interface Level {
  _id: string;
  name: string;
  classIds: string[];
  timings?: {
    startTime?: string;
    endTime?: string;
    breakTime?: {
      startTime?: string;
      duration?: number;
    };
    periodConfig?: {
      periodDuration?: number;
      totalPeriods?: number;
      breakAfterPeriods?: number;
    };
  };
}

interface AssignedClass {
  _id: string;
  name: string;
  monthlyFee?: number;
  level?: Level;
  subjects?: Array<{
    _id: string;
    name: string;
    examMarks?: number;
  }>;
}

interface Teacher {
  _id: string;
  name: string;
  email: string;
  role: string;
  isFirstLogin: boolean;
  profileImage?: string;
  salary?: {
    amount: number;
    currency: string;
  };
  experience?: string;
  education?: string;
  husband?: string;
  dateOfJoining?: string | null;
  DOB?: string | null;
  religion?: string;
  nationalId?: string;
  phone?: string;
  address?: string;
  gender?: string;
  levels?: Level[];
  assignedClasses?: AssignedClass[];
  createdAt?: string;
  updatedAt?: string;
}

function TeacherDetail() {
  const { teacherId } = useParams();
  const { teacher, isTeacherLoading, teacherError } = useTeacher(teacherId);

  if (isTeacherLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (teacherError) {
    return (
      <ErrorMessage
        message={teacherError.message || "Failed to load teacher details"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!teacher) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-text-secondary text-lg">Teacher not found.</p>
          <Link to="/admin/teachers" className="text-primary hover:underline mt-4 inline-block">
            Back to Teachers
          </Link>
        </div>
      </div>
    );
  }

  const teacherData = teacher as Teacher;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <Link
        to="/admin/teachers"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-4"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back to Teachers</span>
      </Link>

      {/* Header Card */}
      <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            {teacherData.profileImage ? (
              <img
                src={teacherData.profileImage}
                alt={teacherData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-primary/10"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-text-white text-3xl font-bold border-4 border-primary/10">
                {getInitials(teacherData.name)}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-status-success rounded-full border-4 border-bg-main flex items-center justify-center">
              <FiUser className="w-4 h-4 text-text-white" />
            </div>
        </div>

          {/* Teacher Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
        <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">{teacherData.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    <span>{teacherData.email}</span>
                  </div>
                  {teacherData.phone && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4" />
                      <span>{teacherData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <Link to={`/admin/teachers/${teacherId}/edit`}>
                <Button variant="secondary" className="flex items-center gap-2">
                  <FiEdit2 className="w-4 h-4" />
                  Edit Teacher
                </Button>
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {teacherData.role?.charAt(0).toUpperCase() + teacherData.role?.slice(1)}
              </span>
              {teacherData.gender && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan-dark">
                  {teacherData.gender.charAt(0).toUpperCase() + teacherData.gender.slice(1)}
                </span>
              )}
              {teacherData.isFirstLogin && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-status-warning/10 text-status-warning">
                  First Login Required
          </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal & Professional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
              <FiUser className="w-5 h-5 text-primary" />
              Personal Information
            </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Date of Birth</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-text-tertiary" />
                    {formatDate(teacherData.DOB)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Gender</label>
                  <p className="text-text-primary mt-1">{teacherData.gender || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Religion</label>
                  <p className="text-text-primary mt-1">{teacherData.religion || "N/A"}</p>
                </div>
                {teacherData.gender === "female" && teacherData.husband && (
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Husband Name</label>
                    <p className="text-text-primary mt-1">{teacherData.husband}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">National ID</label>
                  <p className="text-text-primary mt-1">{teacherData.nationalId || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Phone</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiPhone className="w-4 h-4 text-text-tertiary" />
                    {teacherData.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Address</label>
                  <p className="text-text-primary mt-1 flex items-start gap-2">
                    <FiMapPin className="w-4 h-4 text-text-tertiary mt-1 flex-shrink-0" />
                    <span>{teacherData.address || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>
        </div>

          {/* Professional Information */}
          <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
              <FiBriefcase className="w-5 h-5 text-primary" />
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {teacherData.salary && (
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Salary</label>
                    <p className="text-text-primary mt-1 flex items-center gap-2">
                      <FiDollarSign className="w-4 h-4 text-status-success" />
                      <span className="font-semibold">
                        {teacherData.salary.amount.toLocaleString()} {teacherData.salary.currency}
                      </span>
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Date of Joining</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-text-tertiary" />
                    {formatDate(teacherData.dateOfJoining)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Experience</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-text-tertiary" />
                    {teacherData.experience || "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Education</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiBookOpen className="w-4 h-4 text-text-tertiary" />
                    {teacherData.education || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Account Created</label>
                  <p className="text-text-primary mt-1">{formatDateTime(teacherData.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Last Updated</label>
                  <p className="text-text-primary mt-1">{formatDateTime(teacherData.updatedAt)}</p>
                </div>
              </div>
        </div>
      </div>

          {/* Assigned Classes */}
          {teacherData.assignedClasses && teacherData.assignedClasses.length > 0 && (
            <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-primary" />
                Assigned Classes ({teacherData.assignedClasses.length})
              </h2>
              <div className="space-y-4">
                {teacherData.assignedClasses.map((assignedClass) => (
                  <div
                    key={assignedClass._id}
                    className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text-primary text-lg">{assignedClass.name}</h3>
                        {assignedClass.level && (
                          <p className="text-sm text-text-secondary mt-1">
                            Level: <span className="font-medium">{assignedClass.level.name}</span>
                          </p>
                        )}
                        {assignedClass.monthlyFee && (
                          <p className="text-sm text-text-secondary mt-1">
                            Monthly Fee: <span className="font-medium">{assignedClass.monthlyFee.toLocaleString()} PKR</span>
                          </p>
                        )}
                      </div>
                      <Link
                        to={`/admin/classes/${assignedClass._id}`}
                        className="text-primary hover:text-primary-dark text-sm font-medium"
                      >
                        View Class →
                      </Link>
                    </div>
                    {assignedClass.subjects && assignedClass.subjects.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm font-medium text-text-secondary mb-2">Subjects:</p>
                        <div className="flex flex-wrap gap-2">
                          {assignedClass.subjects.map((subject) => (
                            <span
                              key={subject._id}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-teal/10 text-accent-teal-darker"
                            >
                              {subject.name}
                              {subject.examMarks && (
                                <span className="ml-2 text-text-tertiary">({subject.examMarks} marks)</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Levels */}
          {teacherData.levels && teacherData.levels.length > 0 && (
            <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
                <FiBookOpen className="w-5 h-5 text-primary" />
                Teaching Levels ({teacherData.levels.length})
              </h2>
              <div className="space-y-4">
                {teacherData.levels.map((level) => (
                  <div
                    key={level._id}
                    className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                  >
                    <h3 className="font-semibold text-text-primary text-lg mb-3">{level.name}</h3>
                    {level.timings && (
                      <div className="space-y-3">
                        {(level.timings.startTime || level.timings.endTime) && (
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-text-secondary">
                              <FiClock className="w-4 h-4" />
                              <span>Timing:</span>
                            </div>
                            <span className="text-text-primary font-medium">
                              {level.timings.startTime || "N/A"} - {level.timings.endTime || "N/A"}
                            </span>
                          </div>
                        )}
                        {level.timings.breakTime && (level.timings.breakTime.startTime || level.timings.breakTime.duration) && (
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-text-secondary">
                              <FiClock className="w-4 h-4" />
                              <span>Break:</span>
                            </div>
                            <span className="text-text-primary font-medium">
                              {level.timings.breakTime.startTime || "N/A"} ({level.timings.breakTime.duration || 0} min)
                            </span>
                          </div>
                        )}
                        {level.timings.periodConfig && (
                          <div className="grid grid-cols-3 gap-4 text-sm pt-2 border-t border-border">
                            {level.timings.periodConfig.periodDuration && (
                              <div>
                                <span className="text-text-secondary">Period Duration:</span>
                                <p className="text-text-primary font-medium">{level.timings.periodConfig.periodDuration} min</p>
                              </div>
                            )}
                            {level.timings.periodConfig.totalPeriods && (
                              <div>
                                <span className="text-text-secondary">Total Periods:</span>
                                <p className="text-text-primary font-medium">{level.timings.periodConfig.totalPeriods}</p>
                              </div>
                            )}
                            {level.timings.periodConfig.breakAfterPeriods && (
                              <div>
                                <span className="text-text-secondary">Break After:</span>
                                <p className="text-text-primary font-medium">{level.timings.periodConfig.breakAfterPeriods} periods</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {level.classIds && level.classIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-text-secondary">
                          <span className="font-medium">{level.classIds.length}</span> class(es) assigned
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">First Login</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    teacherData.isFirstLogin
                      ? "bg-status-warning/10 text-status-warning"
                      : "bg-status-success/10 text-status-success"
                  }`}
                >
                  {teacherData.isFirstLogin ? "Required" : "Completed"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Status</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-status-success/10 text-status-success">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {teacherData.assignedClasses?.length || 0}
                </p>
                <p className="text-sm text-text-secondary mt-1">Assigned Classes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {teacherData.levels?.length || 0}
                </p>
                <p className="text-sm text-text-secondary mt-1">Teaching Levels</p>
              </div>
              {teacherData.assignedClasses && (
                <div>
                  <p className="text-2xl font-bold text-text-primary">
                    {teacherData.assignedClasses.reduce(
                      (total, cls) => total + (cls.subjects?.length || 0),
                      0
                    )}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">Total Subjects</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
