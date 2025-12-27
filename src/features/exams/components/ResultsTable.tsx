import React from "react";
import Table from "@/components/common/Table";
import { Mark } from "../types/exam.types";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultsTableProps {
  marks: Mark[];
}

const ResultsTable = ({ marks }: ResultsTableProps) => {
  const resultsColumns = [
    {
      key: "exam",
      header: "Exam",
      render: (row: Mark) => {
        const exam = typeof row.examId === "object" ? row.examId : null;
        return <span className="font-medium text-gray-900">{exam?.name || "—"}</span>;
      },
    },
    {
      key: "subject",
      header: "Subject",
      render: (row: Mark) => {
        const subject = typeof row.subjectId === "object" ? row.subjectId : null;
        return <span className="text-sm text-gray-700">{subject?.name || "—"}</span>;
      },
    },
    {
      key: "obtainedMarks",
      header: "Obtained",
      render: (row: Mark) => (
        <span className="font-medium text-gray-900">{row.obtainedMarks}</span>
      ),
    },
    {
      key: "totalMarks",
      header: "Total",
      render: (row: Mark) => (
        <span className="text-sm text-gray-700">{row.totalMarks}</span>
      ),
    },
    {
      key: "percentage",
      header: "Percentage",
      render: (row: Mark) => {
        const percentage = row.totalMarks > 0
          ? ((row.obtainedMarks / row.totalMarks) * 100).toFixed(2)
          : "0.00";
        return <span className="text-sm text-gray-700">{percentage}%</span>;
      },
    },
    {
      key: "grade",
      header: "Grade",
      render: (row: Mark) => {
        const percentage = row.totalMarks > 0
          ? (row.obtainedMarks / row.totalMarks) * 100
          : 0;
        let grade = "";
        let color = "";
        if (percentage >= 90) {
          grade = "A+";
          color = "text-green-600";
        } else if (percentage >= 80) {
          grade = "A";
          color = "text-green-600";
        } else if (percentage >= 70) {
          grade = "B";
          color = "text-blue-600";
        } else if (percentage >= 60) {
          grade = "C";
          color = "text-yellow-600";
        } else if (percentage >= 50) {
          grade = "D";
          color = "text-orange-600";
        } else {
          grade = "F";
          color = "text-red-600";
        }
        return <span className={`font-semibold ${color}`}>{grade}</span>;
      },
    },
    {
      key: "status",
      header: "Status",
      render: (row: Mark) => {
        const percentage = row.totalMarks > 0
          ? (row.obtainedMarks / row.totalMarks) * 100
          : 0;
        const isPass = percentage >= 50;
        return (
          <div className="flex items-center gap-2">
            {isPass ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Pass</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Fail</span>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Table
      title="Results"
      data={marks}
      columns={resultsColumns}
      selectable={false}
    />
  );
};

export default ResultsTable;

