import React from "react";
import { FaUser, FaBook } from "react-icons/fa";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { SubjectsCardsProps } from "../types/subject-components.types";

const SubjectsCards = React.memo(
  ({ subjects, onEditSubject, onDeleteSubject }: SubjectsCardsProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects?.map((subject) => {
          const classInfo =
            typeof subject.class === "object" && subject.class
              ? subject.class
              : null;

          return (
            <div
              key={subject._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 flex flex-col"
            >
              {/* Class Info */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {classInfo
                    ? `${classInfo.name} (${classInfo.section})`
                    : "No Class"}
                </h2>
                <p className="text-sm text-gray-500">
                  {subject.subjects?.length || 0} subject
                  {(subject.subjects?.length || 0) !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaBook className="w-4 h-4 text-[#2C4FD8]" /> Subjects
                </h3>
                <ul className="space-y-1">
                  {subject.subjects && subject.subjects.length > 0 ? (
                    subject.subjects.map((subj, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-800 flex justify-between"
                      >
                        <span>{subj.name}</span>
                        <span className="text-gray-500">
                          {subj.totalMarks} marks
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 italic">
                      No subjects listed
                    </li>
                  )}
                </ul>
              </div>

              {/* Teacher */}
              <div className="border-t pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2C4FD8] text-white flex items-center justify-center font-bold">
                  {subject.assignedTeacher?.name?.charAt(0).toUpperCase() || "T"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <FaUser className="w-4 h-4 text-[#2C4FD8]" />
                    {subject.assignedTeacher?.name || "Unassigned"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {subject.assignedTeacher?.email || ""}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t flex justify-end gap-1">
                <ViewButton navigateTo={`/admin/subjects/${subject._id}`} />
                <EditButton onClick={() => onEditSubject(subject)} />
                <DeleteButton onClick={() => onDeleteSubject(subject._id)} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

SubjectsCards.displayName = "SubjectsCards";

export default SubjectsCards;

