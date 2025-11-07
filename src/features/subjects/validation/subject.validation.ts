import * as Yup from "yup";

export const addSubjectSchema = Yup.object().shape({
  classId: Yup.string().required("Class is required"),
  subjects: Yup.array().of(Yup.object().shape({
    name: Yup.string().required("Subject name is required"),
    totalMarks: Yup.number().required("Total marks is required"),
  })).required("Subjects are required"),
});