import React from "react";
import { Link } from "react-router-dom";
import { useParent } from "../hooks/useParent";
import { 
  FiUser, 
  FiPhone, 
  FiBriefcase,
  FiDollarSign,
  FiUsers,
  FiEdit2,
  FiArrowLeft,
  FiFileText,
  FiCalendar,
  FiMail
} from "react-icons/fi";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/common/Button";
import { useClassById } from "@/features/classes/hooks/useClassById";

interface Child {
  _id: string;
  name: string;
  rollNumber?: string;
  class: string; // Class ID
}

interface Parent {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  occupation?: string;
  income?: number;
  nationalId?: string;
  children?: Child[];
  createdAt?: string;
  updatedAt?: string;
}

// Component to display child with class info
const ChildCard = ({ child }: { child: Child }) => {
  const { classData, isClassLoading } = useClassById(child.class || null);

  return (
    <div className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary text-lg mb-2">{child.name}</h3>
          <div className="space-y-1">
            {child.rollNumber && (
              <p className="text-sm text-text-secondary">
                <span className="font-medium">Roll Number:</span> {child.rollNumber}
              </p>
            )}
            {isClassLoading ? (
              <p className="text-sm text-text-tertiary">Loading class...</p>
            ) : classData ? (
              <p className="text-sm text-text-secondary">
                <span className="font-medium">Class:</span> {classData.name}
              </p>
            ) : (
              <p className="text-sm text-text-tertiary">Class information not available</p>
            )}
          </div>
        </div>
        <Link
          to={`/admin/students/${child._id}`}
          className="text-primary hover:text-primary-dark text-sm font-medium whitespace-nowrap ml-4"
        >
          View Student →
        </Link>
      </div>
    </div>
  );
};

const ParentDetails = () => {
  const { parent, isParentLoading, parentError } = useParent();

  if (isParentLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (parentError) {
    return (
      <ErrorMessage
        message={parentError.message || "Failed to load parent details"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!parent) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-text-secondary text-lg">Parent not found.</p>
          <Link to="/admin/parents" className="text-primary hover:underline mt-4 inline-block">
            Back to Parents
          </Link>
        </div>
      </div>
    );
  }

  const parentData = parent as Parent;

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

  const formatCurrency = (amount: number | undefined, currency: string = "PKR") => {
    if (amount === undefined || amount === null) return "N/A";
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <Link
        to="/admin/parents"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-4"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back to Parents</span>
      </Link>

      {/* Header Card */}
      <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-teal to-accent-teal-darker flex items-center justify-center text-text-white text-3xl font-bold border-4 border-accent-teal/10">
              {getInitials(parentData.name)}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-status-success rounded-full border-4 border-bg-main flex items-center justify-center">
              <FiUser className="w-4 h-4 text-text-white" />
            </div>
          </div>

          {/* Parent Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">{parentData.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                  {parentData.email && (
                    <div className="flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      <span>{parentData.email}</span>
                    </div>
                  )}
                  {parentData.phone && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4" />
                      <span>{parentData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <Link to={`/admin/parents/${parentData._id}/edit`}>
                <Button variant="secondary" className="flex items-center gap-2">
                  <FiEdit2 className="w-4 h-4" />
                  Edit Parent
                </Button>
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-teal/10 text-accent-teal-darker">
                Parent
              </span>
              {parentData.gender && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan-dark">
                  {parentData.gender.charAt(0).toUpperCase() + parentData.gender.slice(1)}
                </span>
              )}
              {parentData.children && parentData.children.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {parentData.children.length} {parentData.children.length === 1 ? "Child" : "Children"}
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
                  <label className="text-sm font-medium text-text-secondary">Gender</label>
                  <p className="text-text-primary mt-1">
                    {parentData.gender ? parentData.gender.charAt(0).toUpperCase() + parentData.gender.slice(1) : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Phone</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiPhone className="w-4 h-4 text-text-tertiary" />
                    {parentData.phone || "N/A"}
                  </p>
                </div>
                {parentData.email && (
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Email</label>
                    <p className="text-text-primary mt-1 flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-text-tertiary" />
                      {parentData.email}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">National ID</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiFileText className="w-4 h-4 text-text-tertiary" />
                    {parentData.nationalId || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Account Created</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-text-tertiary" />
                    {formatDateTime(parentData.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Last Updated</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-text-tertiary" />
                    {formatDateTime(parentData.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          {(parentData.occupation || parentData.income !== undefined) && (
            <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
                <FiBriefcase className="w-5 h-5 text-primary" />
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Occupation</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiBriefcase className="w-4 h-4 text-text-tertiary" />
                    {parentData.occupation || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Income</label>
                  <p className="text-text-primary mt-1 flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4 text-status-success" />
                    <span className="font-semibold">{formatCurrency(parentData.income)}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Children Section */}
          {parentData.children && parentData.children.length > 0 ? (
            <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-primary" />
                Children ({parentData.children.length})
              </h2>
              <div className="space-y-4">
                {parentData.children.map((child) => (
                  <ChildCard key={child._id} child={child} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-bg-main rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-primary" />
                Children
              </h2>
              <div className="text-center py-8">
                <FiUsers className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                <p className="text-text-secondary">No children linked to this parent.</p>
                <p className="text-sm text-text-tertiary mt-2">
                  Children can be linked when creating or editing a student.
                </p>
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
                <span className="text-sm text-text-secondary">Status</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-status-success/10 text-status-success">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Account Type</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-teal/10 text-accent-teal-darker">
                  Parent
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
                  {parentData.children?.length || 0}
                </p>
                <p className="text-sm text-text-secondary mt-1">Children</p>
              </div>
              {parentData.income !== undefined && parentData.income > 0 && (
                <div>
                  <p className="text-2xl font-bold text-text-primary">
                    {formatCurrency(parentData.income).split(" ")[0]}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">Monthly Income</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl shadow-sm border border-primary/10 p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <FiPhone className="w-5 h-5 text-primary" />
              Quick Contact
            </h3>
            <div className="space-y-3">
              {parentData.phone && (
                <a
                  href={`tel:${parentData.phone}`}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <FiPhone className="w-4 h-4" />
                  <span className="font-medium">{parentData.phone}</span>
                </a>
              )}
              {parentData.email && (
                <a
                  href={`mailto:${parentData.email}`}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <FiMail className="w-4 h-4" />
                  <span className="font-medium break-all">{parentData.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDetails;
