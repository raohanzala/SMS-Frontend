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
  startTime: Yup.string()
    .required("Start time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Start time must be in HH:MM format"),
  endTime: Yup.string()
    .required("End time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "End time must be in HH:MM format")
    .test("is-after-start", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      const [startHour, startMin] = startTime.split(":").map(Number);
      const [endHour, endMin] = value.split(":").map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      return endMinutes > startMinutes;
    }),
  subject: Yup.string().required("Subject is required"),
  teacherId: Yup.string().required("Teacher is required"),
  room: Yup.string().optional(),
  notes: Yup.string().optional(),
  isSubstitute: Yup.boolean().optional(),
  originalTeacherId: Yup.string().when("isSubstitute", {
    is: true,
    then: (schema) => schema.required("Original teacher is required when marking as substitute"),
    otherwise: (schema) => schema.optional(),
  }),
});

