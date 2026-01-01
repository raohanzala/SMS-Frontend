import React from "react";
import Table from "@/components/common/Table";
import { formatShortDate } from "@/utils/helpers";
import { SchoolOwner } from "../types/schoolOwners.types";
import { UserCheck, Building2, CheckCircle, XCircle, Eye } from "lucide-react";
import Button from "@/components/common/Button";

interface SchoolOwnersTableProps {
  owners: SchoolOwner[];
  onViewDetails: (owner: SchoolOwner) => void;
}

const SchoolOwnersTable = ({ owners, onViewDetails }: SchoolOwnersTableProps) => {
  const getUserEmail = (user: SchoolOwner["user"]): string => {
    if (typeof user === "object" && user !== null) {
      return user.email || "N/A";
    }
    return "N/A";
  };

  const getUserStatus = (user: SchoolOwner["user"]): string => {
    if (typeof user === "object" && user !== null) {
      return user.status || "N/A";
    }
    return "N/A";
  };

  const getSchoolName = (school: SchoolOwner["schoolId"]): string => {
    if (!school) return "No School";
    if (typeof school === "object" && school !== null) {
      return school.name || "Unknown";
    }
    return "N/A";
  };

  const getSchoolCode = (school: SchoolOwner["schoolId"]): string => {
    if (!school) return "";
    if (typeof school === "object" && school !== null) {
      return school.code || "";
    }
    return "";
  };

  const getCampusName = (campus: SchoolOwner["campusId"]): string => {
    if (!campus) return "N/A";
    if (typeof campus === "object" && campus !== null) {
      return campus.name || "Unknown";
    }
    return "N/A";
  };

  const ownerColumns = [
    {
      key: "owner",
      header: "Owner",
      render: (row: SchoolOwner) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{getUserEmail(row.user)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "school",
      header: "School",
      render: (row: SchoolOwner) => {
        const schoolName = getSchoolName(row.schoolId);
        const schoolCode = getSchoolCode(row.schoolId);
        return schoolName !== "No School" ? (
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">{schoolName}</div>
              <div className="text-xs text-gray-500">{schoolCode}</div>
            </div>
          </div>
        ) : (
          <span className="text-sm text-gray-400 italic">No School</span>
        );
      },
    },
    {
      key: "campus",
      header: "Campus",
      render: (row: SchoolOwner) => (
        <span className="text-sm text-gray-700">{getCampusName(row.campusId)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: SchoolOwner) => {
        const status = getUserStatus(row.user);
        const isActive = status === "ACTIVE";
        return (
          <div className="flex items-center gap-2">
            {isActive ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Active</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  {status || "Inactive"}
                </span>
              </>
            )}
          </div>
        );
      },
    },
    {
      key: "phone",
      header: "Phone",
      render: (row: SchoolOwner) => (
        <span className="text-sm text-gray-700">{row.phone || "N/A"}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: SchoolOwner) => (
        <span className="text-sm text-gray-700">{formatShortDate(row.createdAt || "")}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: SchoolOwner) => (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(row)}
            startIcon={<Eye className="w-4 h-4" />}
          >
            View
          </Button>
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <Table
      title="School Owners"
      data={owners}
      columns={ownerColumns}
      selectable={false}
    />
  );
};

export default React.memo(SchoolOwnersTable);

