import axiosInstance from "./axiosInstance";

// ✅ Get all timetables (with filters/pagination)
export const getAllTimetables = async (params = {}) => {
  const { data } = await axiosInstance.get("/timetable", { params });
  return data;
};

// ✅ Get timetable by ID
export const getTimetableById = async (id: string) => {
  const { data } = await axiosInstance.get(`/timetable/${id}`);
  return data;
};

// ✅ Get class timetable
export const getClassTimetable = async (classId: string) => {
  const { data } = await axiosInstance.get(`/timetable/class/${classId}`);
  return data;
};

// ✅ Get student timetable
export const getStudentTimetable = async (studentId: string) => {
  const { data } = await axiosInstance.get(`/timetable/student/${studentId}`);
  return data;
};

// ✅ Get teacher timetable
export const getTeacherTimetable = async (teacherId: string) => {
  const { data } = await axiosInstance.get(`/timetable/teacher/${teacherId}`);
  return data;
};

// ✅ Create new timetable
export const createTimetable = async (formData: Record<string, unknown>) => {
  const { data } = await axiosInstance.post("/timetable", formData);
  return data;
};

// ✅ Update timetable
export const updateTimetable = async ({ id, formData }: { id: string; formData: Record<string, unknown> }) => {
  const { data } = await axiosInstance.put(`/timetable/${id}`, formData);
  return data;
};

// ✅ Delete timetable
export const deleteTimetable = async (id: string) => {
  const { data } = await axiosInstance.delete(`/timetable/${id}`);
  return data;
};

// Legacy export for backward compatibility
export const getTimetable = getAllTimetables;
