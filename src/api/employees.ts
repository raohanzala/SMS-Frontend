import { AddEmployeeInput, UpdateEmployeeInput } from "@/features/employees/types/employee.types";
import axiosInstance from "./axiosInstance";

export const getAllEmployeesApi = async (params = {}) => {
  const { data } = await axiosInstance.get("/employees", { params });
  return data;
};

export const getEmployeeByIdApi = async (id: string) => {
  const { data } = await axiosInstance.get(`/employees/${id}`);
  return data;
};

export const addEmployeeApi = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/employees", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateEmployeeApi = async (employeeId: string, formData: FormData) => {
  const { data } = await axiosInstance.put(`/employees/${employeeId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteEmployeeApi = async (id: string) => {
  const { data } = await axiosInstance.delete(`/employees/${id}`);
  return data;
};

