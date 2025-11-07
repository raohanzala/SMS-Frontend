import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";
import React from "react";
import { TeachersTableProps } from "../types/teacher-components.types";

const TeachersCards = React.memo(
  ({ teachers, onEditTeacher, onDeleteTeacher }: TeachersTableProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teachers?.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative"
          >
            {/* Gender Label */}
            <span
              className={`absolute top-3 right-3 text-xs font-medium flex justify-center pt-[2px] items-center h-6 px-2 rounded-full ${
                teacher.gender === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {teacher.gender === "female" ? "Female" : "Male"}
            </span>

            {/* Top Section - Avatar + Name */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  teacher.profileImage || teacher.gender === "female"
                    ? "/female-teacher-avatar.jpg"
                    : "/male-teacher-avatar.jpg"
                }
                alt={teacher.name}
                className="h-14 w-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  {teacher.name}
                </h4>
                <p className="text-xs text-gray-500 capitalize">
                  {teacher.designation || "Teacher"}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-3">
              <p className="text-sm text-gray-700 font-medium">
                {teacher.email || "No email"}
              </p>
              <p className="text-xs text-gray-500">
                {teacher.phone || "No phone"}
              </p>
            </div>

            {/* Assigned Classes */}
            {teacher.assignedClasses && teacher.assignedClasses.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">
                  Classes: {teacher.assignedClasses.length}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {teacher.assignedClasses.map((cls: { _id?: string; name?: string; section?: string } | string) => {
                    if (typeof cls === "string") {
                      return cls;
                    }
                    return cls.name || "Unknown";
                  }).join(", ")}
                </p>
              </div>
            )}

            {/* Date of Joining */}
            {teacher.dateOfJoining && (
              <div className="mt-2">
                <p className="text-xs text-gray-400">
                  Joined: {new Date(teacher.dateOfJoining).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex justify-end space-x-2">
              <ViewButton navigateTo={`/admin/teachers/${teacher._id}`} />
              <EditButton onClick={() => onEditTeacher(teacher)} />
              <DeleteButton onClick={() => onDeleteTeacher(teacher._id)} />
            </div>
          </div>
        ))}
      </div>
    );
  }
);

TeachersCards.displayName = "TeachersCards";

export default TeachersCards;

