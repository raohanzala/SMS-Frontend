import React, { useMemo } from "react";
import Table from "@/components/common/Table";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { formatShortDate } from "@/utils/helpers";
import { Plan } from "../types/plans.types";

interface PlansTableProps {
  plans: Plan[];
  onEditPlan: (plan: Plan) => void;
  onDeletePlan: (planId: string) => void;
}

const PlansTable = ({ plans, onEditPlan, onDeletePlan }: PlansTableProps) => {
  const planColumns = [
    {
      key: "name",
      header: "Plan Name",
      render: (row: Plan) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (row: Plan) => (
        <span>
          {row.price.toLocaleString()} {row.currency}
        </span>
      ),
    },
    {
      key: "billingCycle",
      header: "Billing Cycle",
      render: (row: Plan) => (
        <span className="capitalize">{row.billingCycle.toLowerCase()}</span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (row: Plan) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: Plan) => formatShortDate(row.createdAt || ""),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: Plan) => (
        <div className="flex justify-end space-x-2">
          <EditButton onClick={() => onEditPlan(row)} />
          <DeleteButton onClick={() => onDeletePlan(row._id)} />
        </div>
      ),
      width: "150px",
    },
  ];

  const plansTableData = useMemo(
    () => plans?.map((item) => item) || [],
    [plans]
  );

  return (
    <Table
      title="Plans"
      data={plansTableData}
      columns={planColumns}
      selectable={false}
    />
  );
};

export default React.memo(PlansTable);

