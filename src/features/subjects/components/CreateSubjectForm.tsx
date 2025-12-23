import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAddSubject } from "../hooks/useAddSubject";
import { useUpdateSubject } from "../hooks/useUpdateSubject";
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
      classId: subjectToEdit?.class?._id || "",
      teacherId: subjectToEdit?.teacher?._id || "",
      name: subjectToEdit?.name || "",
      examMarks: subjectToEdit?.examMarks || "",
    },
    validationSchema: addSubjectSchema,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        classId: values.classId,
        teacherId: values.teacherId,
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

  const { values, errors, getFieldProps, setFieldValue, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="space-y-4">
        <FormRowVertical label="Class" name="classId" error={errors.classId}>
          <EntitySelect
            entity="class"
            value={values.classId}
            onChange={(classId: string | null) =>
              setFieldValue("classId", classId || "")
            }
            isDisabled={isLoadingSubject}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Subject Teacher"
          name="teacherId"
          error={errors.teacherId}
        >
          <EntitySelect
            entity="teacher"
            value={values.teacherId}
            onChange={(teacherId: string | null) =>
              setFieldValue("teacherId", teacherId || "")
            }
            isDisabled={isLoadingSubject}
          />
        </FormRowVertical>

        <FormRowVertical label="Subject Name" name="name" error={errors.name}>
          <Input {...getFieldProps("name")} placeholder="Enter Subject Name" />
        </FormRowVertical>

        <FormRowVertical
          label="Exam Marks"
          name="examMarks"
          error={errors.examMarks}
        >
          <Input
            type="number"
            {...getFieldProps("examMarks")}
            placeholder="Enter Exam Marks"
          />
        </FormRowVertical>

        </div>

        <div className="mt-6">
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
