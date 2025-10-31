// src/hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllStudents,
  getStudentById,
  addStudent,
  editStudent,
  deleteStudent,
  assignClassToStudent,
  getStudentsByClass,
  bulkAddStudents,
} from "../api/students";

// 🔑 Query Keys
const STUDENTS_KEY = ["students"];

// ✅ Get all students
export const useStudents = (params) => {
  return useQuery([...STUDENTS_KEY, params], () => getAllStudents(params));
};

// ✅ Get student by ID
export const useStudent = (id) => {
  return useQuery(["student", id], () => getStudentById(id), { enabled: !!id });
};

// ✅ Add student
export const useAddStudent = () => {
  const qc = useQueryClient();
  return useMutation(addStudent, {
    onSuccess: () => qc.invalidateQueries(STUDENTS_KEY),
  });
};


// ✅ Edit student
export const useEditStudent = () => {
  const qc = useQueryClient();
  return useMutation(editStudent, {
    onSuccess: () => qc.invalidateQueries(STUDENTS_KEY),
  });
};

// ✅ Delete student
export const useDeleteStudent = () => {
  const qc = useQueryClient();
  return useMutation(deleteStudent, {
    onSuccess: () => qc.invalidateQueries(STUDENTS_KEY),
  });
};

// ✅ Assign class
export const useAssignClass = () => {
  const qc = useQueryClient();
  return useMutation(assignClassToStudent, {
    onSuccess: () => qc.invalidateQueries(STUDENTS_KEY),
  });
};

// ✅ Get students by class
export const useStudentsByClass = (classId) => {
  return useQuery(["students-by-class", classId], () => getStudentsByClass(classId), {
    enabled: !!classId,
  });
};

// ✅ Bulk Add
export const useBulkAddStudents = () => {
  const qc = useQueryClient();
  return useMutation(bulkAddStudents, {
    onSuccess: () => qc.invalidateQueries(STUDENTS_KEY),
  });
};
