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
          return (
            <div
              key={subject._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative"
            >
              {/* Top Section - Subject Icon + Name */}
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border">
                  <span className="text-lg font-bold text-gray-700">
                    {subject?.name?.charAt(0) || "S"}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {subject?.name || "Unnamed Subject"}
                  </h4>

                  {subject.examMarks !== undefined && (
                    <p className="text-xs text-gray-500">
                      Exam Marks: {subject.examMarks}
                    </p>
                  )}
                </div>
              </div>

              {/* Class Info */}
              {subject.class && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    Class: {subject.class.name}
                  </p>
                </div>
              )}

              {/* Teacher Info */}
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-900">
                  Teacher: {subject.teacher?.name || "Unassigned"}
                </p>

                {subject.teacher?.phone && (
                  <p className="text-xs text-gray-500">
                    Phone: {subject.teacher.phone}
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
