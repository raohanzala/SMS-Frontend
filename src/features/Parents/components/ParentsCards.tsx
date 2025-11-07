import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";
import React from "react";
import { ParentsTableProps } from "../types/parent-components.interface";
import { formatShortDate } from "@/utils/helpers";

const ParentsCards = React.memo(
  ({ parents, onEditParent, onDeleteParent }: ParentsTableProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {parents?.map((parent) => (
          <div
            key={parent._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative"
          >
            {/* Gender Label */}
            <span
              className={`absolute top-3 right-3 text-xs font-medium flex justify-center pt-[2px] items-center h-6 px-2 rounded-full ${
                parent.gender === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {parent.gender === "female" ? "Female" : "Male"}
            </span>

            {/* Top Section - Avatar + Name */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  parent.profileImage || parent.gender === "female"
                    ? "/female-parent-avatar.jpg"
                    : "/male-parent-avatar.jpg"
                }
                alt={parent.name}
                className="h-14 w-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  {parent.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {parent.occupation || "No occupation"}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-3">
              <p className="text-sm text-gray-700 font-medium">
                {parent.email || "No email"}
              </p>
              <p className="text-xs text-gray-500">
                {parent.phone || "No phone"}
              </p>
            </div>

            {/* Address */}
            {parent.address && (
              <div className="mt-2">
                <p className="text-sm text-gray-900 line-clamp-2" title={parent.address}>
                  {parent.address}
                </p>
              </div>
            )}

            {/* Children Info */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900">
                Children: {parent.children?.length || 0}
              </p>
              {parent.children && parent.children.length > 0 && (
                <p className="text-xs text-gray-500">
                  {parent.children.map((child: { _id?: string; name?: string } | string) => {
                    const childName = typeof child === "string" ? child : child.name || "Unknown";
                    return childName;
                  }).join(", ")}
                </p>
              )}
            </div>

            {/* Registration Date */}
            <div className="mt-2 text-xs text-gray-400">
              Registered: {formatShortDate(parent.createdAt || "")}
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end space-x-2">
              <ViewButton navigateTo={`/admin/parents/${parent._id}`} />
              <EditButton onClick={() => onEditParent(parent)} />
              <DeleteButton onClick={() => onDeleteParent(parent._id)} />
            </div>
          </div>
        ))}
      </div>
    );
  }
);

ParentsCards.displayName = "ParentsCards";

export default ParentsCards;

