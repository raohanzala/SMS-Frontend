import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";
import React, { useState } from "react";
import { ClassesCardsProps } from "../types/class-components.interface";
import { Class } from "../types/class.types";

const ClassesCards = React.memo(
  ({ classes, onEditClass, onDeleteClass, selectedClasses, onToggleSelect }: ClassesCardsProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classes?.map((classItem) => {
          const classTeacherName = typeof classItem.classTeacher === "object" 
            ? classItem.classTeacher?.name 
            : classItem.classTeacher || "Unassigned";
          const isSelected = selectedClasses.has(classItem._id);

          return (
            <ClassCard
              key={classItem._id}
              classItem={classItem}
              classTeacherName={classTeacherName}
              isSelected={isSelected}
              onToggleSelect={onToggleSelect}
              onEditClass={onEditClass}
              onDeleteClass={onDeleteClass}
            />
          );
        })}
      </div>
    );
  }
);

ClassesCards.displayName = "ClassesCards";

interface ClassCardProps {
  classItem: Class;
  classTeacherName: string;
  isSelected: boolean;
  onToggleSelect: (classId: string) => void;
  onEditClass: (classItem: Class) => void;
  onDeleteClass: (classId: string) => void;
}

const ClassCard = ({
  classItem,
  classTeacherName,
  isSelected,
  onToggleSelect,
  onEditClass,
  onDeleteClass,
}: ClassCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative ${
        isSelected ? "ring-2 ring-indigo-500" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox - Shows on hover or when selected */}
      {(isHovered || isSelected) && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(classItem._id)}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
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
          {classItem.monthlyFee !== undefined && (
            <p className="text-xs text-gray-500">
              {classItem.monthlyFee.toLocaleString()} PKR/month
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
      {classItem.level && (
        <div className="text-sm font-medium text-gray-900">
          Level: {classItem.level.name}
        </div>
      )}

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
};

export default ClassesCards;

