import { FieldArray, FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAddSubject } from "../hooks/useAddSubject";
import { useUpdateSubject } from "../hooks/useUpdateSubject";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import EntitySelect from "@/components/common/EntitySelect";
import { addSubjectsSchema } from "@/validations/validationSchemas";
import { CreateSubjectFormProps } from "../types/subject-components.types";
import { SubjectItem } from "../types/subject.types";

const CreateSubjectForm = ({
  subjectToEdit,
  onManageSubjectModalClose,
}: CreateSubjectFormProps) => {
  const { addSubjectMutation, isAddingSubject } = useAddSubject();
  const { updateSubjectMutation, isUpdatingSubject } = useUpdateSubject();

  const isLoadingSubject = isAddingSubject || isUpdatingSubject;
  const isEditMode = !!subjectToEdit;

  const getClassId = () => {
    if (typeof subjectToEdit?.class === "object" && subjectToEdit.class) {
      return subjectToEdit.class._id;
    }
    return subjectToEdit?.class || "";
  };

  const formik = useFormik<{
    class: string;
    subjects: SubjectItem[];
  }>({
    initialValues: {
      class: getClassId(),
      subjects:
        subjectToEdit?.subjects || [
          {
            name: "",
            totalMarks: 100,
          },
        ],
    },
    validationSchema: addSubjectsSchema,
    onSubmit: async (values) => {
      if (!isEditMode) {
        addSubjectMutation(values, {
          onSuccess: onManageSubjectModalClose,
        });
      } else {
        if (subjectToEdit?._id) {
          updateSubjectMutation(
            {
              subjectId: subjectToEdit._id,
              updateSubjectInput: values,
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
        <FormRowVertical label="Class" name="class">
          <EntitySelect
            entity="class"
            value={formik.values.class}
            onChange={(id) => formik.setFieldValue("class", id || "")}
          />
        </FormRowVertical>

        {/* Dynamic Subjects */}
        <FieldArray
          name="subjects"
          render={(arrayHelpers) => (
            <div className="space-y-4">
              {formik.values.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border p-3 rounded-md bg-gray-50 relative"
                >
                  <FormRowVertical
                    label="Subject Name"
                    name={`subjects[${index}].name`}
                  >
                    <Input
                      type="text"
                      placeholder="Enter subject name"
                      disabled={isLoadingSubject}
                      {...formik.getFieldProps(`subjects[${index}].name`)}
                    />
                  </FormRowVertical>

                  <FormRowVertical
                    label="Total Marks"
                    name={`subjects[${index}].totalMarks`}
                  >
                    <Input
                      type="number"
                      placeholder="Enter total marks"
                      min={1}
                      disabled={isLoadingSubject}
                      {...formik.getFieldProps(`subjects[${index}].totalMarks`)}
                    />
                  </FormRowVertical>

                  {formik.values.subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                      disabled={isLoadingSubject}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}

              {/* Add new subject button */}
              <button
                type="button"
                onClick={() => arrayHelpers.push({ name: "", totalMarks: 100 })}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                disabled={isLoadingSubject}
              >
                <FiPlus /> Add Another Subject
              </button>
            </div>
          )}
        />

        {/* Submit */}
        <div>
          <Button
            fullWidth
            type="submit"
            disabled={isLoadingSubject}
            loading={isLoadingSubject}
          >
            {isEditMode ? "Update Subjects" : "Add Subjects"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateSubjectForm;

