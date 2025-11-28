import * as Yup from "yup";

const validDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const createTimetableSchema = Yup.object().shape({
  classId: Yup.string().required("Class is required"),
  day: Yup.string()
    .oneOf(validDays, "Invalid day. Must be one of: Mon, Tue, Wed, Thu, Fri, Sat")
    .required("Day is required"),
  period: Yup.number()
    .integer("Period must be an integer")
    .min(1, "Period must be at least 1")
    .required("Period is required"),
  subject: Yup.string().required("Subject is required"),
  room: Yup.string().optional(),
  notes: Yup.string().optional(),
  isSubstitute: Yup.boolean().optional(),
  substituteTeacherId: Yup.string().when("isSubstitute", {
    is: true,
    then: (schema) => schema.required("Substitute teacher is required when marking as substitute"),
    otherwise: (schema) => schema.optional(),
  }),
});

