import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { Subject } from "@/features/subjects/types/subject.types";
import { useCreateTimetable } from "../hooks/useCreateTimetable";
import { useUpdateTimetable } from "../hooks/useUpdateTimetable";
import { CreateTimetableFormProps } from "../types/timetable-components.types";
import { createTimetableSchema } from "../validation/timetable.validation";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import EntitySelect from "@/components/common/EntitySelect";
import { getAllSubjectsApi } from "@/api/subjects";
import { useQuery } from "@tanstack/react-query";

// Helper function to convert short day names to full names
const convertDayToFullName = (day: string): string => {
  const dayMap: Record<string, string> = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };
  return dayMap[day] || day;
};

// Helper function to get subjectId from subject (handles both string names and objects)
const getSubjectId = (subject: string | Subject | undefined, subjects: Subject[]): string => {
  if (!subject) return "";
  if (typeof subject === "string") {
    // If it's a string, try to find by name first, then by _id
    const found = subjects.find((s) => s.name === subject || s._id === subject);
    return found?._id || "";
  }
  // If it's an object, return _id
  return (subject as Subject)._id || "";
};

const CreateTimetableForm = ({
  timetableToEdit,
  onClose,
}: CreateTimetableFormProps) => {
  const { createTimetableMutation, isCreatingTimetable } = useCreateTimetable();
  const { updateTimetableMutation, isUpdatingTimetable } = useUpdateTimetable();

  const isEditMode = !!timetableToEdit;
  const editClassId = timetableToEdit?.class?._id || (typeof timetableToEdit?.class === "string" ? timetableToEdit.class : "");

  // Fetch subjects for the selected class in edit mode
  const { data: subjectsData } = useQuery({
    queryKey: ["subjects", "class", editClassId],
    queryFn: () => getAllSubjectsApi({ classId: editClassId, isAll: true }),
    enabled: !!editClassId && isEditMode,
  });

  const editModeSubjects = useMemo(() => subjectsData?.data?.subjects || [], [subjectsData?.data?.subjects]);

  const formik = useFormik({
    initialValues: {
      classId: typeof timetableToEdit?.class === "object" && timetableToEdit?.class?._id
        ? timetableToEdit.class._id
        : (typeof timetableToEdit?.class === "string" ? timetableToEdit.class : ""),
      day: timetableToEdit?.day ? convertDayToFullName(timetableToEdit.day) : "Monday",
      period: timetableToEdit?.period || 1,
      subjectId: "",
      room: timetableToEdit?.room || "",
      notes: timetableToEdit?.notes || "",
      isSubstitute: timetableToEdit?.isSubstitute || false,
      substituteTeacherId: typeof timetableToEdit?.teacher === "object" && timetableToEdit?.teacher?._id
        ? timetableToEdit.teacher._id
        : (typeof timetableToEdit?.teacher === "string" ? timetableToEdit.teacher : ""),
    },
    validationSchema: createTimetableSchema,
    enableReinitialize: true,
    onSubmit: async (formValues) => {
      // Transform form values to match backend expectations
      const submitData: {
        classId: string;
        day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
        period: number;
        subjectId: string;
        room?: string;
        notes?: string;
        isSubstitute?: boolean;
        substituteTeacherId?: string;
      } = {
        classId: formValues.classId,
        day: formValues.day as "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday",
        period: formValues.period,
        subjectId: formValues.subjectId,
        room: formValues.room || undefined,
        notes: formValues.notes || undefined,
        isSubstitute: formValues.isSubstitute || undefined,
        substituteTeacherId: formValues.isSubstitute ? formValues.substituteTeacherId : undefined,
      };

      if (!isEditMode) {
        createTimetableMutation(submitData, {
          onSuccess: () => onClose?.(),
        });
      } else {
        if (timetableToEdit?._id) {
          updateTimetableMutation(
            { id: timetableToEdit._id, formData: submitData },
            {
              onSuccess: () => onClose?.(),
            }
          );
        }
      }
    },
  });
  const { errors, getFieldProps, handleSubmit, values, setFieldValue } = formik;

  // Fetch subjects for the currently selected class
  const { data: currentSubjectsData } = useQuery({
    queryKey: ["subjects", "class", values.classId],
    queryFn: () => getAllSubjectsApi({ classId: values.classId, isAll: true }),
    enabled: !!values.classId && !isEditMode,
  });

  const subjects = useMemo(() => {
    if (isEditMode) {
      return editModeSubjects;
    }
    return currentSubjectsData?.data?.subjects || [];
  }, [isEditMode, editModeSubjects, currentSubjectsData]);

  // Set subjectId when editing and subjects are loaded
  useEffect(() => {
    if (isEditMode && subjects.length > 0 && !values.subjectId) {
      const subjectId = getSubjectId(timetableToEdit?.subject, subjects);
      if (subjectId) {
        setFieldValue("subjectId", subjectId);
      }
    }
  }, [isEditMode, subjects, timetableToEdit?.subject, values.subjectId, setFieldValue]);

  useEffect(() => {
    if (!isEditMode && values.classId) {
      setFieldValue("subjectId", "");
    }
  }, [values.classId, isEditMode, setFieldValue]);


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
            onChange={(value) => {
              const classId = Array.isArray(value) ? value[0] : value;
              setFieldValue("classId", classId || "");
            }}
            placeholder="Select class"
            isDisabled={isCreatingTimetable || isUpdatingTimetable}
          />
        </FormRowVertical>

        <FormRowVertical label="Day" name="day" error={errors.day}>
          <EntitySelect
            entity="static"
            staticOptions={[
              { value: "Monday", label: "Monday" },
              { value: "Tuesday", label: "Tuesday" },
              { value: "Wednesday", label: "Wednesday" },
              { value: "Thursday", label: "Thursday" },
              { value: "Friday", label: "Friday" },
              { value: "Saturday", label: "Saturday" },
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

        <FormRowVertical label="Subject" name="subjectId" error={errors.subjectId}>
          <EntitySelect
            entity="static"
            staticOptions={subjects.map((subject: Subject) => ({
              value: subject._id,
              label: subject.name,
            }))}
            isDisabled={!values.classId || subjects.length === 0}
            value={values.subjectId}
            onChange={(value) => {
              const subjectId = Array.isArray(value) ? value[0] : value;
              setFieldValue("subjectId", subjectId || "");
            }}
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
              onChange={(value) => {
                const teacherId = Array.isArray(value) ? value[0] : value;
                setFieldValue("substituteTeacherId", teacherId || "");
              }}
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
