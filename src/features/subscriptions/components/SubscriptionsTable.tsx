import React from "react";
import Table from "@/components/common/Table";
import { formatShortDate, formatDateTime } from "@/utils/helpers";
import { Subscription } from "../types/subscriptions.types";
import { CreditCard, Building2, XCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Button from "@/components/common/Button";

interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  onCancel: (subscription: Subscription) => void;
}

const SubscriptionsTable = ({ subscriptions, onCancel }: SubscriptionsTableProps) => {
  const getSchoolName = (school: Subscription["schoolId"]): string => {
    if (typeof school === "object" && school !== null) {
      return school.name || "N/A";
    }
    return "N/A";
  };

  const getSchoolCode = (school: Subscription["schoolId"]): string => {
    if (typeof school === "object" && school !== null) {
      return school.code || "";
    }
    return "";
  };

  const getPlanName = (plan: Subscription["planId"]): string => {
    if (typeof plan === "object" && plan !== null) {
      return plan.name || "N/A";
    }
    return "N/A";
  };

  const getPlanPrice = (plan: Subscription["planId"]): string => {
    if (typeof plan === "object" && plan !== null) {
      const billingCycle = plan.billingCycle?.toLowerCase() || "monthly";
      return `${plan.price} ${plan.billingCycle || ""}`;
    }
    return "N/A";
  };

  const getStatusBadge = (status: Subscription["status"]) => {
    const statusConfig = {
      ACTIVE: {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        label: "Active",
      },
      TRIAL: {
        icon: Clock,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        label: "Trial",
      },
      EXPIRED: {
        icon: AlertCircle,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        textColor: "text-orange-800",
        label: "Expired",
      },
      CANCELLED: {
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.ACTIVE;
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-2 ${config.bgColor} ${config.textColor} px-2.5 py-1 rounded-full`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className="text-xs font-medium">{config.label}</span>
      </div>
    );
  };

  const subscriptionColumns = [
    {
      key: "school",
      header: "School",
      render: (row: Subscription) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{getSchoolName(row.schoolId)}</div>
            <div className="text-sm text-gray-500">{getSchoolCode(row.schoolId)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      render: (row: Subscription) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <CreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{getPlanName(row.planId)}</div>
            <div className="text-sm text-gray-500">{getPlanPrice(row.planId)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Subscription) => getStatusBadge(row.status),
    },
    {
      key: "dates",
      header: "Period",
      render: (row: Subscription) => (
        <div className="text-sm">
          <div className="text-gray-900">Start: {formatShortDate(row.startDate)}</div>
          <div className="text-gray-500">End: {formatShortDate(row.endDate)}</div>
          {row.isTrial && row.trialEndsAt && (
            <div className="text-xs text-blue-600 mt-1">
              Trial ends: {formatShortDate(row.trialEndsAt)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: Subscription) => (
        <span className="text-sm text-gray-700">{formatShortDate(row.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: Subscription) => (
        <div className="flex justify-end items-center gap-2">
          {row.status === "ACTIVE" || row.status === "TRIAL" ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCancel(row)}
              startIcon={<XCircle className="w-4 h-4" />}
            >
              Cancel
            </Button>
          ) : null}
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <Table
      title="Subscriptions"
      data={subscriptions}
      columns={subscriptionColumns}
      selectable={false}
    />
  );
};

export default React.memo(SubscriptionsTable);

