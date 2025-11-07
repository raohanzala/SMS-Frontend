import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";
import React from "react";
import { ClassesCardsProps } from "../types/class-components.interface";

const ClassesCards = React.memo(
  ({ classes, onEditClass, onDeleteClass }: ClassesCardsProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classes?.map((classItem) => {
          const classTeacherName = typeof classItem.classTeacher === "object" 
            ? classItem.classTeacher?.name 
            : classItem.classTeacher || "Unassigned";

          return (
            <div
              key={classItem._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative"
            >
              {/* Top Section - Class Name */}
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border">
                  <span className="text-lg font-bold text-gray-700">
                    {classItem.name?.charAt(0) || "C"}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {classItem.name}
                  </h4>
                  {classItem.monthlyTuitionFee !== undefined && (
                    <p className="text-xs text-gray-500">
                      {classItem.monthlyTuitionFee.toLocaleString()} PKR/month
                    </p>
                  )}
                </div>
              </div>

              {/* Class Teacher */}
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">
                  Teacher: {classTeacherName}
                </p>
                {typeof classItem.classTeacher === "object" && classItem.classTeacher?.email && (
                  <p className="text-xs text-gray-500">
                    {classItem.classTeacher.email}
                  </p>
                )}
              </div>

              {/* Created Date */}
              {classItem.createdAt && (
                <div className="mt-2 text-xs text-gray-400">
                  Created: {new Date(classItem.createdAt).toLocaleDateString()}
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex justify-end space-x-2">
                <ViewButton navigateTo={`/admin/classes/${classItem._id}`} />
                <EditButton onClick={() => onEditClass(classItem)} />
                <DeleteButton onClick={() => onDeleteClass(classItem._id)} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

ClassesCards.displayName = "ClassesCards";

export default ClassesCards;

