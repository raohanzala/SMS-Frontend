import { FieldArray, FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAddSubject } from "../hooks/useAddSubject";
import { useUpdateSubject } from "../hooks/useUpdateSubject";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import EntitySelect from "@/components/common/EntitySelect";
import { CreateSubjectFormProps } from "../types/subject-components.types";
import { addSubjectSchema } from "../validation/subject.validation";

const CreateSubjectForm = ({
  subjectToEdit,
  onManageSubjectModalClose,
}: CreateSubjectFormProps) => {
  const { addSubjectMutation, isAddingSubject } = useAddSubject();
  const { updateSubjectMutation, isUpdatingSubject } = useUpdateSubject();

  const isLoadingSubject = isAddingSubject || isUpdatingSubject;
  const isEditMode = !!subjectToEdit;

  const formik = useFormik({
    initialValues: {
      classId: subjectToEdit?.class?._id || "", // class reference
      subjectTeacherId: subjectToEdit?.teacher?._id || "", // teacher reference
      subjectName: subjectToEdit?.name || "",
      examMarks: subjectToEdit?.examMarks || "", // number field
    },
    validationSchema: addSubjectSchema,
    onSubmit: async (values) => {
      const payload = {
        name: values.subjectName,
        classId: values.classId,
        teacherId: values.subjectTeacherId,
        examMarks: Number(values.examMarks),
      };

      if (!isEditMode) {
        addSubjectMutation(payload, {
          onSuccess: onManageSubjectModalClose,
        });
      } else {
        if (subjectToEdit?._id) {
          updateSubjectMutation(
            {
              subjectId: subjectToEdit._id,
              updateSubjectInput: payload,
            },
            {
              onSuccess: onManageSubjectModalClose,
            }
          );
        }
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="space-y-6"
      >
        {/* Class Select */}
        <FormRowVertical label="Class" name="classId">
          <EntitySelect
            entity="class"
            value={formik.values.classId}
            onChange={(classId: string | null) =>
              formik.setFieldValue("classId", classId || "")
            }
          />
        </FormRowVertical>

        {/* Teacher Select */}
        <FormRowVertical label="Subject Teacher" name="subjectTeacherId">
          <EntitySelect
            entity="teacher"
            value={formik.values.subjectTeacherId}
            onChange={(teacherId: string | null) =>
              formik.setFieldValue("subjectTeacherId", teacherId || "")
            }
          />
        </FormRowVertical>

        {/* Subject Name */}
        <FormRowVertical label="Subject Name" name="subjectName">
          <Input
            name="subjectName"
            value={formik.values.subjectName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Subject Name"
          />
        </FormRowVertical>

        {/* Exam Marks */}
        <FormRowVertical label="Exam Marks" name="examMarks">
          <Input
            name="examMarks"
            type="number"
            value={formik.values.examMarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Exam Marks"
          />
        </FormRowVertical>

        {/* Submit */}
        <div>
          <Button
            fullWidth
            type="submit"
            disabled={isLoadingSubject}
            loading={isLoadingSubject}
          >
            {isEditMode ? "Update Subject" : "Add Subject"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateSubjectForm;
