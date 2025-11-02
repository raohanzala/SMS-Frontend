import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import React from "react";
import { StudentsTableProps } from "../types/student-components.types";

const StudentsTable = React.memo(
  ({ onEditStudent, onDeleteStudent, students }: StudentsTableProps) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Students ({students?.length || 0})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-nowrap">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class & Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students?.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  {/* Student Info */}
                  <td className="px-6 py-4 whitespace-nowrap relative">
                    <div className="flex items-center">
                      <img
                        src={
                          student.profileImage || student.gender === "female"
                            ? "/female-student-avatar.jpg"
                            : "/male-student-avatar.jpg"
                        }
                        alt={student.name}
                        className="h-14 w-14 rounded-full object-cover border"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Roll No: {student.rollNumber || "N/A"}
                          <p
                            className={`${
                              student.gender === "female"
                                ? "text-xs text-pink-500"
                                : "text-xs text-blue-500"
                            } font-bold`}
                          >
                            Gender: {student.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Class & Section */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.class?.name || "N/A"}{" "}
                    <span className="text-gray-500">
                      ({student.class?.section || "-"})
                    </span>
                  </td>

                  {/* Parent Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.parent?.name || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.parent?.phone || "No phone"}
                    </div>
                  </td>

                  {/* Student Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.email || "No email"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.phone || "No phone"}
                    </div>
                  </td>

                  {/* Admission Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <ViewButton
                        navigateTo={`/admin/students/${student._id}`}
                      />
                      <EditButton onClick={() => onEditStudent(student)} />
                      <DeleteButton
                        onClick={() => onDeleteStudent(student._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

StudentsTable.displayName = "StudentsTable";

export default StudentsTable;
