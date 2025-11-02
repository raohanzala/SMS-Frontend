import { FiMail, FiPhone, FiMapPin, FiUser, FiBookOpen, FiUserCheck, FiCalendar } from "react-icons/fi";
// import { useStudent } from "@/features/students/useStudent";
import { useStudent } from '../../../features/students/hooks/useStudent'


function StudentDetail() {
  const { student, isLoadingStudent } = useStudent();

  if (isLoadingStudent) {
    return <p className="text-center py-6 text-gray-500">Loading student details...</p>;
  }

  if (!student) {
    return <p className="text-center py-6 text-red-500">Student not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* === HEADER === */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
        <div className="flex items-center gap-6 p-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold uppercase backdrop-blur-sm">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={student.name}
                className="w-full h-full object-cover rounded-full border-4 border-white/30"
              />
            ) : (
              student.name.charAt(0)
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{student.name}</h1>
            <div className="flex items-center gap-3 mt-1 text-blue-100 text-sm">
              <FiMail /> <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100 text-sm mt-1">
              <FiBookOpen /> <span>Roll No: {student.rollNumber || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* === GRID INFO SECTION === */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
            <FiUser className="text-blue-500" /> Contact Info
          </h2>
          <p className="flex items-center gap-2 text-gray-700 mb-2">
            <FiPhone className="text-gray-400" /> {student.phone || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FiMapPin className="text-gray-400" /> {student.address || "N/A"}
          </p>
        </div>

        {/* Class Info */}
        <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
            <FiBookOpen className="text-green-500" /> Class Info
          </h2>
          <p><span className="font-medium text-gray-800">Class:</span> {student.class?.name || "N/A"}</p>
          <p><span className="font-medium text-gray-800">Section:</span> {student.class?.section || "N/A"}</p>
          <p className="text-sm text-gray-500 mt-2">
            Subjects: {student.class?.subjects?.length || 0}
          </p>
        </div>

        {/* Parent Info */}
        <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
            <FiUserCheck className="text-orange-500" /> Parent Info
          </h2>
          {student.parent ? (
            <>
              <p className="text-gray-800 font-medium">{student.parent.name}</p>
              <p className="text-gray-600 text-sm">{student.parent.email}</p>
              <p className="text-gray-600 text-sm">{student.parent.phone}</p>
              <p className="text-gray-600 text-sm">{student.parent.address}</p>
            </>
          ) : (
            <p className="text-gray-500">No parent assigned.</p>
          )}
        </div>
      </div>

      {/* === TIMELINE / META INFO === */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <FiCalendar className="text-purple-500" /> Activity
        </h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium">First Login:</span> {student.isFirstLogin ? "Yes" : "No"}</p>
          <p><span className="font-medium">Created At:</span> {new Date(student.createdAt).toLocaleString()}</p>
          <p><span className="font-medium">Updated At:</span> {new Date(student.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;
