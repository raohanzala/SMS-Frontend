import { FieldArray, FormikProvider, useFormik } from 'formik';
import React from 'react'
import FormRowVertical from '@/components/common/FormRowVerticle';
import Button from '@/components/common/Button';
import { addStudentSchema } from '@/validations/validationSchemas';
import Input from '@/components/common/Input';
import { useCreateSubject } from './useCreateSubject';
import { useUpdateSubject } from './useUpdateSubject';
import { useClasses } from '../classes/useClasses';
import { useTeachers } from '../teachers/useTeachers';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

function CreateSubjectForm({ subjectToEdit, onClose }) {
  const { createSubject, isCreating } = useCreateSubject();
  const { updateSubject, isUpdating } = useUpdateSubject();

  const { classes } = useClasses(true);
  const { teachers } = useTeachers(true);

  const isEditMode = Boolean(subjectToEdit);

  const formik = useFormik({
    initialValues: {
      classId: subjectToEdit?.classId?._id || "",
      assignedTeacher: subjectToEdit?.assignedTeacher?._id || "",
      subjects:
        subjectToEdit?.subjects || [
          {
            name: "",
            totalMarks: 100,
          },
        ],
    },
    onSubmit: async (values) => {
      if (!isEditMode) {
        createSubject(values, {
          onSuccess: () => {
            onClose?.();
          },
        });
      } else {
        updateSubject(
          { id: subjectToEdit?._id, values },
          {
            onSuccess: () => {
              onClose?.();
            },
          }
        );
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
          <select
            id="classId"
            name="classId"
            value={formik.values.classId}
            onChange={(e) => formik.setFieldValue("classId", e.target.value)}
            disabled={formik.isSubmitting}
          >
            <option value="">Select Class</option>
            {classes?.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name} ({cls.section})
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Teacher Select */}
        <FormRowVertical label="Assigned Teacher" name="assignedTeacher">
          <select
            id="assignedTeacher"
            name="assignedTeacher"
            value={formik.values.assignedTeacher}
            onChange={(e) =>
              formik.setFieldValue("assignedTeacher", e.target.value)
            }
            disabled={formik.isSubmitting}
          >
            <option value="">No Teacher Assigned</option>
            {teachers?.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
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
                      {...formik.getFieldProps(`subjects[${index}].totalMarks`)}
                    />
                  </FormRowVertical>

                  {formik.values.subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}

              {/* Add new subject button */}
              <button
                type="button"
                onClick={() =>
                  arrayHelpers.push({ name: "", totalMarks: 100 })
                }
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
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
            disabled={formik.isSubmitting}
            loading={isCreating || isUpdating}
          >
            {isEditMode ? "Update Subjects" : "Add Subjects"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateSubjectForm