import axiosInstance from "./axiosInstance";

export const getAttendanceByClass = async (classId, date) => {
  const { data } = await axiosInstance.get(`/attendance/students/${classId}?date=${date}`);
  return data;
};

export const getAttendanceByDate = async (date) => {
  const { data } = await axiosInstance.get(`/attendance/employees/${date}`);
  return data;
};

export const markStudentsAttendance = async (studentsAttendance) => {
  const res = await axiosInstance.post(`/attendance/class`, studentsAttendance);
  return res.data;
};

export const markEmployeesAttendance = async (employeesAttendance) => {
  const res = await axiosInstance.post(`/attendance/employees`, employeesAttendance);
  return res.data;
};


