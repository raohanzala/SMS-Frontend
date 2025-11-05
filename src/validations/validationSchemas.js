import * as Yup from 'yup';

export const addSubjectsSchema = Yup.object().shape({
  class: Yup.string()
    .required("Please select a class")
    .typeError("Invalid class selection"),

  subjects: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .min(2, "Subject name must be at least 2 characters")
          .max(50, "Subject name cannot exceed 50 characters")
          .required("Subject name is required"),

        totalMarks: Yup.number()
          .typeError("Total marks must be a number")
          .min(1, "Total marks must be at least 1")
          .max(1000, "Total marks cannot exceed 1000")
          .required("Total marks are required"),
      })
    )
    .min(1, "At least one subject is required")
    .required("Subjects are required"),
});

