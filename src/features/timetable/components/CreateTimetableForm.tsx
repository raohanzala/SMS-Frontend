import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useCreateTimetable } from "../hooks/useCreateTimetable";
import { useUpdateTimetable } from "../hooks/useUpdateTimetable";
import { CreateTimetableFormProps } from "../types/timetable-components.types";
import { createTimetableSchema } from "../validation/timetable.validation";
import EntitySelect from "@/components/common/EntitySelect";
import { useClassById } from "../hooks/useClassById";
import { useEffect } from "react";
import { TimetableEntry } from "../types/timetable.types";
import { Subject } from "@/features/subjects/types/subject.types";

const CreateTimetableForm = ({
  timetableToEdit,
  onClose,
}: CreateTimetableFormProps) => {
  const { createTimetableMutation, isCreatingTimetable } =
    useCreateTimetable();
  const { updateTimetableMutation, isUpdatingTimetable } = useUpdateTimetable();

  const isEditMode = !!timetableToEdit;

  // Get class data to fetch subjects
  const classId = timetableToEdit
    ? typeof timetableToEdit.class === "object"
      ? timetableToEdit.class._id
      : timetableToEdit.class
    : null;

  const { classData } = useClassById(
    isEditMode ? classId : null
  );

  const formik = useFormik({
    initialValues: {
      classId:
        (typeof timetableToEdit?.class === "object"
          ? timetableToEdit?.class?._id
          : timetableToEdit?.class) || "",
      day: (timetableToEdit?.day as any) || "Mon",
      period: timetableToEdit?.period || 1,
      startTime: timetableToEdit?.startTime || "",
      endTime: timetableToEdit?.endTime || "",
      subject: timetableToEdit?.subject || "",
      teacherId:
        (typeof timetableToEdit?.teacher === "object"
          ? timetableToEdit?.teacher?._id
          : timetableToEdit?.teacher) || "",
      room: timetableToEdit?.room || "",
      notes: timetableToEdit?.notes || "",
      isSubstitute: timetableToEdit?.isSubstitute || false,
      originalTeacherId:
        (typeof timetableToEdit?.originalTeacher === "object"
          ? timetableToEdit?.originalTeacher?._id
          : timetableToEdit?.originalTeacher) || "",
    },
    validationSchema: createTimetableSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload: any = {
        classId: values.classId,
        day: values.day,
        period: Number(values.period),
        startTime: values.startTime,
        endTime: values.endTime,
        subject: values.subject,
        teacherId: values.teacherId,
      };

      if (values.room) payload.room = values.room;
      if (values.notes) payload.notes = values.notes;
      if (values.isSubstitute) {
        payload.isSubstitute = true;
        if (values.originalTeacherId) {
          payload.originalTeacherId = values.originalTeacherId;
        }
      }

      if (!isEditMode) {
        createTimetableMutation(payload, {
          onSuccess: () => onClose?.(),
        });
      } else {
        if (timetableToEdit?._id) {
          updateTimetableMutation(
            { id: timetableToEdit._id, formData: payload },
            {
              onSuccess: () => onClose?.(),
            }
          );
        }
      }
    },
  });

  // Fetch class data when classId changes (for new entries)
  const { classData: selectedClassData } = useClassById(
    formik.values.classId || null
  );

  // Get subjects from class data
  const subjects =
    (isEditMode ? classData?.subjects : selectedClassData?.subjects) || [];

  // Reset subject when class changes
  useEffect(() => {
    if (!isEditMode && formik.values.classId) {
      formik.setFieldValue("subject", "");
    }
  }, [formik.values.classId, isEditMode]);

  const { errors, getFieldProps, handleSubmit, values, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        {/* Class */}
        <FormRowVertical
          label="Class"
          name="classId"
          error={errors.classId}
        >
          <EntitySelect
            entity="class"
            value={formik.values.classId}
            onChange={(classId: string | null) =>
              formik.setFieldValue("classId", classId || "")
            }
            placeholder="Select class"
          />
        </FormRowVertical>

        {/* Day */}
        <FormRowVertical label="Day" name="day" error={errors.day}>
          <select
            className="w-full mt-1 text-sm px-4 py-3 border rounded-md"
            {...getFieldProps("day")}
          >
            <option value="Mon">Monday</option>
            <option value="Tue">Tuesday</option>
            <option value="Wed">Wednesday</option>
            <option value="Thu">Thursday</option>
            <option value="Fri">Friday</option>
            <option value="Sat">Saturday</option>
          </select>
        </FormRowVertical>

        {/* Period */}
        <FormRowVertical
          label="Period"
          name="period"
          error={errors.period}
        >
          <Input
            type="number"
            placeholder="e.g. 1"
            min="1"
            {...getFieldProps("period")}
          />
        </FormRowVertical>

        {/* Start Time */}
        <FormRowVertical
          label="Start Time"
          name="startTime"
          error={errors.startTime}
        >
          <Input
            type="time"
            placeholder="HH:MM"
            {...getFieldProps("startTime")}
          />
        </FormRowVertical>

        {/* End Time */}
        <FormRowVertical
          label="End Time"
          name="endTime"
          error={errors.endTime}
        >
          <Input
            type="time"
            placeholder="HH:MM"
            {...getFieldProps("endTime")}
          />
        </FormRowVertical>

        {/* Subject */}
        <FormRowVertical
          label="Subject"
          name="subject"
          error={errors.subject}
        >
          <select
            className="w-full mt-1 text-sm px-4 py-3 border rounded-md"
            {...getFieldProps("subject")}
            disabled={!formik.values.classId || subjects.length === 0}
          >
            <option value="">
              {!formik.values.classId
                ? "Select a class first"
                : subjects.length === 0
                ? "No subjects available for this class"
                : "Select subject"}
            </option>
            {subjects.map((subject: Subject) => (
              <option key={subject._id || subject.name} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Teacher */}
        <FormRowVertical
          label="Teacher"
          name="teacherId"
          error={errors.teacherId}
        >
          <EntitySelect
            entity="teacher"
            value={formik.values.teacherId}
            onChange={(teacherId: string | null) =>
              formik.setFieldValue("teacherId", teacherId || "")
            }
            placeholder="Select teacher"
          />
        </FormRowVertical>

        {/* Room (Optional) */}
        <FormRowVertical label="Room" name="room" error={errors.room}>
          <Input
            type="text"
            placeholder="e.g. Room 101"
            {...getFieldProps("room")}
          />
        </FormRowVertical>

        {/* Notes (Optional) */}
        <FormRowVertical label="Notes" name="notes" error={errors.notes}>
          <textarea
            className="w-full mt-1 text-sm px-4 py-3 border rounded-md"
            rows={3}
            placeholder="Additional notes..."
            {...getFieldProps("notes")}
          />
        </FormRowVertical>

        {/* Is Substitute */}
        <FormRowVertical
          label=""
          name="isSubstitute"
          error={errors.isSubstitute}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isSubstitute"
              checked={values.isSubstitute}
              onChange={(e) => {
                setFieldValue("isSubstitute", e.target.checked);
                if (!e.target.checked) {
                  setFieldValue("originalTeacherId", "");
                }
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isSubstitute"
              className="ml-2 block text-sm text-gray-900"
            >
              This is a substitute assignment
            </label>
          </div>
        </FormRowVertical>

        {/* Original Teacher (if substitute) */}
        {values.isSubstitute && (
          <FormRowVertical
            label="Original Teacher"
            name="originalTeacherId"
            error={errors.originalTeacherId}
          >
            <EntitySelect
              entity="teacher"
              value={formik.values.originalTeacherId}
              onChange={(teacherId: string | null) =>
                formik.setFieldValue("originalTeacherId", teacherId || "")
              }
              placeholder="Select original teacher"
            />
          </FormRowVertical>
        )}

        {/* Submit Button */}
        <div>
          <Button
            fullWidth={true}
            type="submit"
            loading={isCreatingTimetable || isUpdatingTimetable}
          >
            {!isEditMode ? "Add Timetable Entry" : "Update Timetable Entry"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateTimetableForm;

