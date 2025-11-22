import * as Yup from "yup";

export const addSubjectSchema = Yup.object().shape({
  classId: Yup.string().required("Class is required"),
  name: Yup.string().required("Subject name is required"),
  examMarks: Yup.number().required("Exam marks is required"),
  teacherId: Yup.string().required("Subject teacher is required"),
});