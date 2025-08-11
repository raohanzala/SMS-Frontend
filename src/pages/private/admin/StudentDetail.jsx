import React from "react";
import { useStudent } from "../../../features/students/useStudent";

function StudentDetail() {
  const { student, isPending } = useStudent();

  if (isPending) {
    return <p className="text-center py-6 text-gray-500">Loading student details...</p>;
  }

  if (!student) {
    return <p className="text-center py-6 text-red-500">student not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
          {student.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-gray-600">{student.email}</p>
          <span className="inline-block bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full mt-2">
            student
          </span>
        </div>
      </div>

      {/* student Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Contact Information</h2>
          <p><span className="font-medium">Phone:</span> {student.phone || "N/A"}</p>
          <p><span className="font-medium">Address:</span> {student.address || "N/A"}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Account Details</h2>
          <p><span className="font-medium">First Login:</span> {student.isFirstLogin ? "Yes" : "No"}</p>
          <p><span className="font-medium">Created At:</span> {new Date(student.createdAt).toLocaleString()}</p>
          <p><span className="font-medium">Updated At:</span> {new Date(student.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Children List */}
      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Children</h2>
        {student.children && student.children.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Class</th>
                <th className="py-2 px-4">Section</th>
              </tr>
            </thead>
            <tbody>
              {student.children.map((child) => (
                <tr key={child._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{child.name}</td>
                  <td className="py-2 px-4">{child.email}</td>
                  <td className="py-2 px-4">{child.classId?.name || "N/A"}</td>
                  <td className="py-2 px-4">{child.classId?.section || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No children linked to this student.</p>
        )}
      </div>
    </div>
  );
}

export default StudentDetail;
