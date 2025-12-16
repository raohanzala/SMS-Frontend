import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";
import { SelectableCard } from "@/components/common/SelectableCard";
import React from "react";
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
  return (
    <SelectableCard
      isSelected={isSelected}
      onToggleSelect={() => onToggleSelect(classItem._id)}
      className="flex flex-col relative"
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
    </SelectableCard>
  );
};

export default ClassesCards;

