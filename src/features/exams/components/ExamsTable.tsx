import React from "react";
import Table from "@/components/common/Table";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { Exam } from "../types/exam.types";
import { formatShortDate } from "@/utils/helpers";

interface ExamsTableProps {
  exams: Exam[];
  onEditExam: (exam: Exam) => void;
  onDeleteExam: (id: string) => void;
  isDeleting: boolean;
}

interface ExamsTableRow extends Exam {
  onEditExam: (exam: Exam) => void;
  onDeleteExam: (id: string) => void;
  isDeleting: boolean;
}

const ExamsTable = ({
  exams,
  onEditExam,
  onDeleteExam,
  isDeleting,
}: ExamsTableProps) => {
  const examColumns = [
    {
      key: "name",
      header: "Exam Name",
      render: (row: ExamsTableRow) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "session",
      header: "Session",
      render: (row: ExamsTableRow) => {
        const session = typeof row.sessionId === "object" ? row.sessionId : null;
        return <span className="text-sm text-gray-700">{session?.name || "—"}</span>;
      },
    },
    {
      key: "startDate",
      header: "Start Date",
      render: (row: ExamsTableRow) => (
        <span className="text-sm text-gray-700">
          {row.startDate ? formatShortDate(row.startDate) : "—"}
        </span>
      ),
    },
    {
      key: "endDate",
      header: "End Date",
      render: (row: ExamsTableRow) => (
        <span className="text-sm text-gray-700">
          {row.endDate ? formatShortDate(row.endDate) : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: ExamsTableRow) => (
        <div className="flex justify-end items-center gap-2">
          <EditButton onClick={() => row.onEditExam(row)} />
          <DeleteButton
            onClick={() => row.onDeleteExam(row._id)}
            disabled={row.isDeleting}
          />
        </div>
      ),
      width: "150px",
    },
  ];

  const tableData = exams.map((exam) => ({
    ...exam,
    onEditExam,
    onDeleteExam,
    isDeleting,
  }));

  return (
    <Table
      title="Exams"
      data={tableData}
      columns={examColumns}
      selectable={false}
    />
  );
};

export default ExamsTable;

