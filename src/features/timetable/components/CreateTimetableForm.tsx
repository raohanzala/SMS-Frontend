import { FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { Subject } from "@/features/subjects/types/subject.types";
import { useCreateTimetable } from "../hooks/useCreateTimetable";
import { useUpdateTimetable } from "../hooks/useUpdateTimetable";
import { CreateTimetableFormProps } from "../types/timetable-components.types";
import { createTimetableSchema } from "../validation/timetable.validation";
import { useClassById } from "../../classes/hooks/useClassById";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import EntitySelect from "@/components/common/EntitySelect";

const CreateTimetableForm = ({
  timetableToEdit,
  onClose,
}: CreateTimetableFormProps) => {
  const { createTimetableMutation, isCreatingTimetable } = useCreateTimetable();
  const { updateTimetableMutation, isUpdatingTimetable } = useUpdateTimetable();

  const isEditMode = !!timetableToEdit;
  const classId = timetableToEdit?.class._id

  const { classData } = useClassById(isEditMode ? classId || "" : null);

  const formik = useFormik({
    initialValues: {
      classId: timetableToEdit?.class,
      day: timetableToEdit?.day || "Mon",
      period: timetableToEdit?.period || 1,
      subject: timetableToEdit?.subject || "",
      room: timetableToEdit?.room || "",
      notes: timetableToEdit?.notes || "",
      isSubstitute: timetableToEdit?.isSubstitute || false,
      substituteTeacherId: timetableToEdit?.teacher || "",
    },
    validationSchema: createTimetableSchema,
    enableReinitialize: true,
    onSubmit: async (formValues) => {


      if (!isEditMode) {
        createTimetableMutation(formValues, {
          onSuccess: () => onClose?.(),
        });
      } else {
        if (timetableToEdit?._id) {
          updateTimetableMutation(
            { id: timetableToEdit._id, formData: formValues },
            {
              onSuccess: () => onClose?.(),
            }
          );
        }
      }
    },
  });
  const { errors, getFieldProps, handleSubmit, values, setFieldValue } = formik;
  const { classData: selectedClass } = useClassById(values.classId || null);
  const subjects = (isEditMode ? classData?.subjects : selectedClass?.subjects) || [];

  useEffect(() => {
    if (!isEditMode && formik.values.classId) {
      formik.setFieldValue("subject", "");
    }
  }, [formik.values.classId, isEditMode]);


  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <FormRowVertical label="Class" name="classId" error={errors.classId}>
          <EntitySelect
            entity="class"
            value={values.classId}
            onChange={(classId: string | null) =>
              setFieldValue("classId", classId || "")
            }
            placeholder="Select class"
            isDisabled={isCreatingTimetable || isUpdatingTimetable}
          />
        </FormRowVertical>

        <FormRowVertical label="Day" name="day" error={errors.day}>
          <EntitySelect
            entity="static"
            staticOptions={[
              { value: "Mon", label: "Monday" },
              { value: "Tue", label: "Tuesday" },
              { value: "Wed", label: "Wednesday" },
              { value: "Thu", label: "Thursday" },
              { value: "Fri", label: "Friday" },
              { value: "Sat", label: "Saturday" },
            ]}
            value={values.day}
            onChange={(day) => setFieldValue("day", day)}
            placeholder="Select Day"
            isDisabled={isCreatingTimetable || isUpdatingTimetable}
          />
        </FormRowVertical>

        <FormRowVertical label="Period" name="period" error={errors.period}>
          <Input
            type="number"
            placeholder="e.g. 1"
            min="1"
            {...getFieldProps("period")}
          />
        </FormRowVertical>

        <FormRowVertical label="Subject" name="subject" error={errors.subject}>
          <EntitySelect
            entity="static"
            staticOptions={subjects.map((subject: Subject) => ({
              value: subject.name,
              label: subject.name,
            }))}
            isDisabled={!values.classId || subjects.length === 0}
            value={values.subject}
            onChange={(subject: string | null) =>
              setFieldValue("subject", subject || "")
            }
            placeholder="Select subject"
          />
        </FormRowVertical>

        <FormRowVertical label="Room" name="room" error={errors.room}>
          <Input
            type="text"
            placeholder="e.g. Room 101"
            {...getFieldProps("room")}
          />
        </FormRowVertical>

        <FormRowVertical label="Notes" name="notes" error={errors.notes}>
          <textarea
            className="w-full mt-1 text-sm px-4 py-3 border rounded-md"
            rows={3}
            placeholder="Additional notes..."
            {...getFieldProps("notes")}
          />
        </FormRowVertical>

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
                  setFieldValue("substituteTeacherId", "");
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

        {values.isSubstitute && (
          <FormRowVertical
            label="Substitute Teacher"
            name="substituteTeacherId"
            error={errors.substituteTeacherId}
          >
            <EntitySelect
              entity="teacher"
              value={values.substituteTeacherId}
              onChange={(teacherId: string | null) =>
                setFieldValue("substituteTeacherId", teacherId || "")
              }
              placeholder="Select substitute teacher"
              isDisabled={isCreatingTimetable || isUpdatingTimetable}
            />
          </FormRowVertical>
        )}

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
