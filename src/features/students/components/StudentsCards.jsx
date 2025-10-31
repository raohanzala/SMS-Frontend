import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";

function StudentsCards({ students, onEditStudent, onDeleteStudent }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {students?.map((student) => (
        <div
          key={student._id}
          className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative"
        >
          {/* ✅ Gender Label */}
          <span
            className={`absolute top-3 right-3 text-xs font-medium flex justify-center pt-[2px] items-center h-6 px-2 rounded-full ${student.gender === "female"
              ? "bg-pink-500 text-white"
              : "bg-blue-500 text-white"
              }`}
          >
            {student.gender === "female" ? "Female" : "Male"}
          </span>

          {/* Top Section - Avatar + Name */}
          <div className="flex items-center space-x-4">
            <img
              src={student.profileImage || student.gender === 'female' ? "/female-student-avatar.jpg" : '/male-student-avatar.jpg'}
              alt={student.name}
              className="h-14 w-14 rounded-full object-cover border"
            />
            <div>
              <h4 className="text-base font-semibold text-gray-900">
                {student.name}
              </h4>

              <p className="text-xs text-gray-500">
                Roll No: {student.rollNumber || "N/A"}
              </p>

              <p className={`${student.gender === 'female' ? 'text-xs text-pink-500' : 'text-xs text-blue-500'} font-bold relative`}>
              </p>

            </div>
          </div>

          {/* Class & Section */}
          <div className="mt-3">
            <p className="text-sm text-gray-700 font-medium">
              {student.class?.name || "N/A"}{" "}
              <span className="text-gray-500">
                ({student.class?.section || "-"})
              </span>
            </p>
          </div>

          {/* Parent Info */}
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">
              Parent: {student.parent?.name || "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              {student.parent?.phone || "No phone"}
            </p>
          </div>

          {/* Student Contact */}
          <div className="mt-2">
            <p className="text-sm text-gray-900">
              {student.email || "No email"}
            </p>
            <p className="text-xs text-gray-500">
              {student.phone || "No phone"}
            </p>
          </div>

          {/* Admission Date */}
          <div className="mt-2 text-xs text-gray-400">
            Admitted: {new Date(student.createdAt).toLocaleDateString()}
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end space-x-2">
            <ViewButton navigateTo={`/admin/students/${student._id}`} />
            <EditButton onClick={() => onEditStudent(student)} />
            <DeleteButton onClick={() => onDeleteStudent(student._id)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentsCards;
