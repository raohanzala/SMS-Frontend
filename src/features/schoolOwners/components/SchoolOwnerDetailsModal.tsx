import Modal from "@/components/common/Modal";
import { SchoolOwnerDetails } from "../types/schoolOwners.types";
import { formatShortDate, formatDateTime } from "@/utils/helpers";
import { UserCheck, Building2, CreditCard, MapPin, Phone, Mail, Calendar } from "lucide-react";

interface SchoolOwnerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  owner: SchoolOwnerDetails | null;
  isLoading?: boolean;
}

export default function SchoolOwnerDetailsModal({
  isOpen,
  onClose,
  owner,
  isLoading = false,
}: SchoolOwnerDetailsModalProps) {
  if (!owner) return null;

  const getUserEmail = (user: SchoolOwnerDetails["user"]): string => {
    if (typeof user === "object" && user !== null) {
      return user.email || "N/A";
    }
    return "N/A";
  };

  const getUserStatus = (user: SchoolOwnerDetails["user"]): string => {
    if (typeof user === "object" && user !== null) {
      return user.status || "N/A";
    }
    return "N/A";
  };

  const getSchoolName = (school: SchoolOwnerDetails["schoolId"]): string => {
    if (!school) return "No School";
    if (typeof school === "object" && school !== null) {
      return school.name || "Unknown";
    }
    return "N/A";
  };

  const getSchoolCode = (school: SchoolOwnerDetails["schoolId"]): string => {
    if (!school) return "";
    if (typeof school === "object" && school !== null) {
      return school.code || "";
    }
    return "";
  };

  const getCampusName = (campus: SchoolOwnerDetails["campusId"]): string => {
    if (!campus) return "N/A";
    if (typeof campus === "object" && campus !== null) {
      return campus.name || "Unknown";
    }
    return "N/A";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="School Owner Details"
      size="lg"
    >
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Owner Information */}
          <div className="border-b border-border pb-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Owner Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Name
                </label>
                <p className="mt-1 text-sm text-text-primary">{owner.name}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Email
                </label>
                <p className="mt-1 text-sm text-text-primary flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {getUserEmail(owner.user)}
                </p>
              </div>
              {owner.phone && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Phone
                  </label>
                  <p className="mt-1 text-sm text-text-primary flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {owner.phone}
                  </p>
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Status
                </label>
                <p className="mt-1 text-sm text-text-primary">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getUserStatus(owner.user) === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {getUserStatus(owner.user)}
                  </span>
                </p>
              </div>
              {owner.address && (
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Address
                  </label>
                  <p className="mt-1 text-sm text-text-primary flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {owner.address}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* School Information */}
          {owner.schoolId && getSchoolName(owner.schoolId) !== "No School" && (
            <div className="border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                School Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    School Name
                  </label>
                  <p className="mt-1 text-sm text-text-primary">{getSchoolName(owner.schoolId)}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    School Code
                  </label>
                  <p className="mt-1 text-sm text-text-primary font-mono">{getSchoolCode(owner.schoolId)}</p>
                </div>
                {owner.school && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                        Status
                      </label>
                      <p className="mt-1 text-sm text-text-primary">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          owner.school.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {owner.school.isActive ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                    {owner.campusesCount !== undefined && (
                      <div>
                        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                          Campuses
                        </label>
                        <p className="mt-1 text-sm text-text-primary">{owner.campusesCount}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Campus Information */}
          {owner.campusId && getCampusName(owner.campusId) !== "N/A" && (
            <div className="border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Campus Information
              </h3>
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Campus Name
                </label>
                <p className="mt-1 text-sm text-text-primary">{getCampusName(owner.campusId)}</p>
              </div>
            </div>
          )}

          {/* Subscription Information */}
          {owner.subscription && (
            <div className="border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Subscription Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Plan
                  </label>
                  <p className="mt-1 text-sm text-text-primary">
                    {owner.subscription.planId?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Status
                  </label>
                  <p className="mt-1 text-sm text-text-primary">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      owner.subscription.status === "ACTIVE" || owner.subscription.status === "TRIAL"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {owner.subscription.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Start Date
                  </label>
                  <p className="mt-1 text-sm text-text-primary flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatShortDate(owner.subscription.startDate)}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    End Date
                  </label>
                  <p className="mt-1 text-sm text-text-primary flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatShortDate(owner.subscription.endDate)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Account Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {owner.createdAt && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Created At
                  </label>
                  <p className="mt-1 text-sm text-text-primary">
                    {formatDateTime(owner.createdAt)}
                  </p>
                </div>
              )}
              {owner.updatedAt && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Updated At
                  </label>
                  <p className="mt-1 text-sm text-text-primary">
                    {formatDateTime(owner.updatedAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

