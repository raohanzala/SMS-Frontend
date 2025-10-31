import { useEffect, useState } from "react";
import { useStudentAttendance } from "./useStudentAttendance";
import Button from "../../components/common/Button";
import { useSearchParams } from "react-router-dom";
import { useMarkClassAttendance } from "./useMarkClassAttendance";

function ClassAttendanceTable() {
  // Local state for attendance status per student
  const [searchParams, setSearchParams] = useSearchParams();
  const [attendance, setAttendance] = useState([]);
  const { students, isPending, error } = useStudentAttendance()
  const {markAttendance} = useMarkClassAttendance()

  console.log(attendance)

  const handleStatusChange = (studentId, newStatus) => {
      setAttendance((prev) =>
        prev.map((a) =>
          a.studentId === studentId ? { ...a, status: newStatus } : a
        )
      );
    };

    const hadleSave = ()=> {
        markAttendance({records: attendance,  classId: searchParams.get("classId") || "",
            date: searchParams.get("date") || "", })
    }
  // when students are fetched
  useEffect(() => {
    if (students?.length > 0) {
      setAttendance(
        students.map((s) => ({
          studentId: s._id,
          status: s.status || "not-marked",
        }))
      );
    }
  }, [students]);

  return (
    <div>
      {students?.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Student", "Roll No", "Gender", "Parent", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <Button onClick={hadleSave}>Save Attendance</Button>

            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => {
                const current = attendance.find(
                  (a) => a.studentId === student._id
                );

                return (
                  <tr key={student._id} className="hover:bg-gray-50">
                    {/* Student Info */}
                    <td className="px-6 py-4 flex items-center">
                      <img
                        src={
                          student.gender === "female"
                            ? "/female-student-avatar.jpg"
                            : "/male-student-avatar.jpg"
                        }
                        alt={student.name}
                        className="h-10 w-10 rounded-full object-cover border"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Class: {student.class}
                        </div>
                      </div>
                    </td>

                    {/* Roll No */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.rollNumber}
                    </td>

                    {/* Gender */}
                    <td className="px-6 py-4 capitalize text-sm">
                      <span
                        className={`font-medium ${
                          student.gender === "female"
                            ? "text-pink-600"
                            : "text-blue-600"
                        }`}
                      >
                        {student.gender}
                      </span>
                    </td>

                    {/* Parent */}
                    <td className="px-6 py-4 text-sm">
                      {student.parent ? (
                        <>
                          <div className="font-medium text-gray-900">
                            {student.parent.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.parent.phone || "No phone"}
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-400 italic">No parent</span>
                      )}
                    </td>

                    {/* Attendance Circles */}
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        {[
                          { key: "present", label: "P", color: "green" },
                          { key: "absent", label: "A", color: "red" },
                          { key: "leave", label: "L", color: "yellow" },
                        ].map(({ key, label, color }) => {
                          const isActive = current?.status === key;

                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() =>
                                 handleStatusChange(student._id, key)
                              }
                              className={`w-9 h-9 flex items-center justify-center rounded-full border text-sm font-bold transition-all duration-200
                              ${
                                isActive
                                  ? `bg-${color}-500 text-white ring-2 ring-${color}-300 scale-105`
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                              title={key.charAt(0).toUpperCase() + key.slice(1)}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClassAttendanceTable;
