import { useParent } from "@/features/Parents/useParent";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

function ParentDetails() {
  const { parent, isPending } = useParent();

  if (isPending)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading parent details...</p>
      </div>
    );

  if (!parent)
    return (
      <p className="text-center py-6 text-red-500">
        Parent not found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-100">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-semibold shadow-md">
            {parent.name.charAt(0).toUpperCase()}
          </div>
          <span className="absolute -bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">{parent.name}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <FiMail className="text-blue-500" />
            <span>{parent.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiPhone className="text-blue-500" />
            <span>{parent.phone || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiMapPin className="text-blue-500" />
            <span>{parent.address || "N/A"}</span>
          </div>

          <div className="mt-3">
            <span className="inline-flex items-center bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
              <FiUser className="w-3.5 h-3.5 mr-1" /> Parent
            </span>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Contact Information
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Phone:</span> {parent.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium">Address:</span> {parent.address || "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Account Details
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">First Login:</span>{" "}
              {parent.isFirstLogin ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-medium">Created At:</span>{" "}
              <FiCalendar className="inline mr-1 text-blue-500" />
              {new Date(parent.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Updated At:</span>{" "}
              {new Date(parent.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Children Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Children
        </h2>

        {parent.children && parent.children.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {parent.children.map((child) => (
              <div
                key={child._id}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                    <FaUserAlt />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {child.name}
                    </h3>
                    <p className="text-sm text-gray-600">{child.email}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Roll #:</span>{" "}
                    {child.rollNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Class:</span>{" "}
                    {child.classId?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Section:</span>{" "}
                    {child.classId?.section || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No children linked to this parent.</p>
        )}
      </div>
    </div>
  );
}

export default ParentDetails;
