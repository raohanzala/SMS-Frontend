import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import { useCreateTimetable } from "./useCreateTimetable";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useTeachers } from "../teachers/useTeachers";
import { useSubjects } from "../subjects/useSubjects";
import { useClasses } from "../classes/useClasses";


function CreateTimetableForm({ onClose }) {
  const { createTimetable, isCreating } = useCreateTimetable();
  const { teachers } = useTeachers()
  const { subjectData } = useSubjects()
  const { classes } = useClasses()

  console.log(subjectData)

  // ✅ Validation Schema
  const timetableSchema = Yup.object().shape({
    classId: Yup.string().required("Class is required"),
    schedule: Yup.array().of(
      Yup.object().shape({
        day: Yup.string().required("Day is required"),
        periods: Yup.array().of(
          Yup.object().shape({
            subjectId: Yup.string().required("Subject is required"),
            teacher: Yup.string().required("Teacher is required"),
            room: Yup.string().required("Room is required"),
            time: Yup.string().required("Time is required"),
          })
        ),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      classId: "",
      schedule: [
        {
          day: "",
          periods: [
            { subjectId: "", teacher: "", room: "", time: "" },
          ],
        },
      ],
    },
    validationSchema: timetableSchema,
    onSubmit: (values) => {
      createTimetable(values, {
        onSuccess: () => {
          onClose?.();
        },
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800">Create Timetable</h2>

        {/* ✅ Select Class */}
        <FormRowVertical label="Select Class" name="classId">
          <select
            id="classId"
            name="classId"
            value={formik.values.classId}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
          >
            <option value="">Select Class</option>
            {/* Map through classes */}
            {classes?.map((subject) => (
              <option key={subject?._id} value={subject?._id}>{subject?.name}</option>
            ))
            }
          </select>
        </FormRowVertical>

        {/* ✅ Dynamic Days & Periods */}
        <FieldArray name="schedule">
          {({ remove, push }) => (
            <div className="space-y-4">
              {formik.values.schedule.map((dayObj, dayIndex) => (
                <div key={dayIndex} className="p-4 border rounded-xl bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <FormRowVertical label="Day" name={`schedule.${dayIndex}.day`}>
                      <Input
                        type="text"
                        name={`schedule.${dayIndex}.day`}
                        placeholder="e.g. Monday"
                        value={dayObj.day}
                        onChange={formik.handleChange}
                      />
                    </FormRowVertical>
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => remove(dayIndex)}
                    >
                      Remove Day
                    </Button>
                  </div>

                  {/* ✅ Periods for this day */}
                  <FieldArray name={`schedule.${dayIndex}.periods`}>
                    {({ remove: removePeriod, push: pushPeriod }) => (
                      <div className="space-y-3">
                        {dayObj.periods.map((period, pIndex) => (
                          <div
                            key={pIndex}
                            className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white p-3 rounded-lg border"
                          >
                            <select
                              name={`schedule.${dayIndex}.periods.${pIndex}.subjectId`}
                              value={period.subjectId}
                              onChange={formik.handleChange}
                            >
                              <option value="">Select Subject</option>
                              {subjectData?.map((subject) => (
                                <option key={subject?._id} value={subject?._id}>{subject?.name}</option>
                              ))
                              }
                            </select>
                            <select
                              name={`schedule.${dayIndex}.periods.${pIndex}.teacher`}
                              value={period.teacher}
                              onChange={formik.handleChange}
                            >
                              <option value="">Select Teacher</option>
                              {teachers?.map((teacher) => (
                                <option key={teacher?._id} value={teacher?._id}>{teacher?.name}</option>
                              ))
                              }
                            </select>
                            <Input
                              name={`schedule.${dayIndex}.periods.${pIndex}.room`}
                              placeholder="Room"
                              value={period.room}
                              onChange={formik.handleChange}
                            />
                            <Input
                              name={`schedule.${dayIndex}.periods.${pIndex}.time`}
                              placeholder="Time (e.g. 9AM - 10AM)"
                              value={period.time}
                              onChange={formik.handleChange}
                            />

                            <div className="col-span-1 md:col-span-4 flex justify-end">
                              <Button
                                variant="destructive"
                                type="button"
                                size="sm"
                                onClick={() => removePeriod(pIndex)}
                              >
                                Remove Period
                              </Button>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() =>
                            pushPeriod({
                              subjectId: "",
                              teacher: "",
                              room: "",
                              time: "",
                            })
                          }
                        >
                          + Add Period
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => push({ day: "", periods: [{ subjectId: "", teacher: "", room: "", time: "" }] })}
              >
                + Add Day
              </Button>
            </div>
          )}
        </FieldArray>

        <Button
          fullWidth
          type="submit"
          disabled={formik.isSubmitting || isCreating}
          loading={isCreating}
        >
          Create Timetable
        </Button>
      </form>
    </FormikProvider>
  );
}

export default CreateTimetableForm;
