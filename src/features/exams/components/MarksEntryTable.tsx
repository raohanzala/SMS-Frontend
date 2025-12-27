import React, { useState, useEffect } from "react";
import Table from "@/components/common/Table";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Student } from "@/features/students/types/student.types";
import { Mark, BulkMarkEntry } from "../types/exam.types";
import { Save } from "lucide-react";

interface MarksEntryTableProps {
  students: Student[];
  existingMarks: Mark[];
  totalMarks: number;
  onSave: (marks: BulkMarkEntry[]) => void;
  isSaving: boolean;
}

interface MarksEntryRow extends Student {
  obtainedMarks: number;
  totalMarks: number;
  onMarksChange: (studentId: string, obtainedMarks: number) => void;
  totalMarksValue: number;
}

const MarksEntryTable = ({
  students,
  existingMarks,
  totalMarks,
  onSave,
  isSaving,
}: MarksEntryTableProps) => {
  const [localMarks, setLocalMarks] = useState<Record<string, number>>({});

  // Initialize local marks from existing marks
  useEffect(() => {
    const marksMap: Record<string, number> = {};
    existingMarks.forEach((mark) => {
      const studentId = typeof mark.studentId === "object" ? mark.studentId._id : mark.studentId;
      marksMap[studentId] = mark.obtainedMarks;
    });
    setLocalMarks(marksMap);
  }, [existingMarks]);

  const handleMarksChange = (studentId: string, obtainedMarks: number) => {
    setLocalMarks((prev) => ({
      ...prev,
      [studentId]: obtainedMarks,
    }));
  };

  const handleSave = () => {
    const marksToSave: BulkMarkEntry[] = students.map((student) => ({
      studentId: student._id,
      obtainedMarks: localMarks[student._id] || 0,
      totalMarks: totalMarks,
    }));
    onSave(marksToSave);
  };

  const marksColumns = [
    {
      key: "student",
      header: "Student",
      render: (row: MarksEntryRow) => (
        <div>
          <span className="font-medium text-gray-900 block">{row.name}</span>
          {row.rollNumber && (
            <span className="text-xs text-gray-500">Roll: {row.rollNumber}</span>
          )}
        </div>
      ),
    },
    {
      key: "obtainedMarks",
      header: "Obtained Marks",
      render: (row: MarksEntryRow) => (
        <Input
          type="number"
          value={localMarks[row._id] || ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            handleMarksChange(row._id, value);
          }}
          min="0"
          max={row.totalMarksValue}
          step="0.01"
          className="w-32"
          placeholder="0"
        />
      ),
    },
    {
      key: "totalMarks",
      header: "Total Marks",
      render: (row: MarksEntryRow) => (
        <span className="text-sm text-gray-700 font-medium">
          {row.totalMarksValue}
        </span>
      ),
    },
    {
      key: "percentage",
      header: "Percentage",
      render: (row: MarksEntryRow) => {
        const obtained = localMarks[row._id] || 0;
        const percentage = row.totalMarksValue > 0
          ? ((obtained / row.totalMarksValue) * 100).toFixed(2)
          : "0.00";
        return (
          <span className="text-sm text-gray-700">
            {percentage}%
          </span>
        );
      },
    },
  ];

  const tableData = students.map((student) => ({
    ...student,
    obtainedMarks: localMarks[student._id] || 0,
    totalMarks: totalMarks,
    onMarksChange: handleMarksChange,
    totalMarksValue: totalMarks,
  }));

  return (
    <div className="space-y-4">
      <Table
        title={`Marks Entry (${students.length} students)`}
        data={tableData}
        columns={marksColumns}
        selectable={false}
      />
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={handleSave}
          loading={isSaving}
          startIcon={<Save className="h-4 w-4" />}
        >
          Save Marks
        </Button>
      </div>
    </div>
  );
};

export default MarksEntryTable;

