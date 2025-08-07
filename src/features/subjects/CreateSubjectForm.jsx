import { FormikProvider, useFormik } from 'formik';
import React from 'react'
import FormRowVertical from '../../components/common/FormRowVerticle';
import Button from '../../components/common/Button';
import { addStudentSchema } from '../../validations/validationSchemas';
import Input from '../../components/common/Input';
import { useCreateSubject } from './useCreateSubject';
import { useUpdateSubject } from './useUpdateSubject';

function CreateSubjectForm({ subjectToEdit, onClose }) {
  const { createSubject, isCreating } = useCreateSubject()
  const { updateSubject, isUpdating } = useUpdateSubject();


  const isEditMode = subjectToEdit ? true : false

  const formik = useFormik({
    initialValues: {
      name: subjectToEdit?.name || '',
      code: subjectToEdit?.code || '',
      // class: subjectToEdit?.class || '',
      // assignedTeacher: subjectToEdit?.class || '',
    },
    // validationSchema: addStudentSchema,
    onSubmit: async (values) => {
      console.log(values)
      if (!isEditMode) {
        createSubject(values, {
          onSuccess: () => {
            // reset();
            onClose?.();
          },
        })
      } else {
        updateSubject({ id: subjectToEdit?._id, values }, {
          onSuccess: () => {
            // reset();
            onClose?.();

          }
        })
      }
    },
  })

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="space-y-4"
      >
        {/* Name */}
        <FormRowVertical label="Subject Name" name="name">
          <Input
            type="text"
            id="name"
            name="name"
            disabled={formik.isSubmitting}
            placeholder="Enter full name"
            {...formik.getFieldProps("name")}
          />
        </FormRowVertical>

        {/* Email + Phone in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Enter Code" name="code">
            <Input
              type="text"
              id="code"
              name="code"
              disabled={formik.isSubmitting}
              placeholder="Enter code"
              {...formik.getFieldProps("code")}
            />
          </FormRowVertical>
        </div>


        {/* Submit */}
        <div>
          <Button fullWidth={true} type="submit" disabled={formik.isSubmitting} loading={isCreating}>
            {!isEditMode ? 'Add Subject' : 'Edit Subject'}
          </Button>
        </div>
      </form>
    </FormikProvider>

  )

}

export default CreateSubjectForm