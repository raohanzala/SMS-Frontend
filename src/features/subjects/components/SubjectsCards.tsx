import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";
import React from "react";
import { SubjectsCardsProps } from "../types/subject-components.types";

const SubjectsCards = React.memo(
  ({ subjects, onEditSubject, onDeleteSubject }: SubjectsCardsProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects?.map((subject) => {
          const subjectsCount = subject.subjects?.length || 0;
          const totalMarks = subject.subjects?.reduce((sum, subj) => sum + (subj.totalMarks || 0), 0) || 0;

          return (
            <div
              key={subject._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative"
            >
              {/* Top Section - Class Name */}
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border">
                  <span className="text-lg font-bold text-gray-700">
                    {subject.name?.charAt(0) || "C"}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {subject.name || "Unnamed Class"}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {subjectsCount} {subjectsCount === 1 ? "Subject" : "Subjects"}
                  </p>
                </div>
              </div>

              {/* Monthly Fee */}
              {subject.monthlyFee !== undefined && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    Fee: {subject.monthlyFee.toLocaleString()} PKR
                  </p>
                </div>
              )}

              {/* Subjects List */}
              {subject.subjects && subject.subjects.length > 0 ? (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Subjects:
                  </p>
                  <div className="space-y-1">
                    {subject.subjects.map((subj) => (
                      <p key={subj._id} className="text-xs text-gray-600">
                        {subj.name} ({subj.totalMarks} marks)
                      </p>
                    ))}
                  </div>
                  {subjectsCount > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Total: {totalMarks} marks
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-gray-400 italic">
                    No subjects assigned
                  </p>
                </div>
              )}

              {/* Class Teacher */}
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-900">
                  Teacher: {subject.classTeacher?.name || "Unassigned"}
                </p>
                {subject.classTeacher?.email && (
                  <p className="text-xs text-gray-500">
                    {subject.classTeacher.email}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end space-x-2">
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

