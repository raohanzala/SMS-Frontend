import { FormikProvider, useFormik } from 'formik';
import React from 'react'
import FormRowVertical from '../../components/common/FormRowVerticle';
import Button from '../../components/common/Button';
import { addStudentSchema } from '../../validations/validationSchemas';
import Input from '../../components/common/Input';
import { useCreateStudent } from './useCreateStudent';
import { editStudent } from '../../api/students';
import { useClasses } from '../classes/useClasses';

function CreateStudentForm({ studentToEdit, onClose }) {
  const { createStudent, isCreating } = useCreateStudent()
  const { classes, isPending } = useClasses()

  console.log(studentToEdit)

  const isEditMode = studentToEdit ? true : false

  const formik = useFormik({
    initialValues: {
      name: studentToEdit?.name || '',
      email: studentToEdit?.email || '',
      phone: studentToEdit?.phone || '',
      address: studentToEdit?.address || '',
      section: studentToEdit?.section || '',
      classId: studentToEdit?.classId || '',
      rollNumber: studentToEdit?.rollNumber || ''
    },
    validationSchema: addStudentSchema, // We'll update this
    onSubmit: async (values) => {
      console.log(values)
      if (!isEditMode) {
        createStudent(values, {
          onSuccess: (data) => {
            // reset();
            onClose?.();
          },
        })
      } else {
        editStudent({ id: studentToEdit?._id, values }, {
          onSuccess: (data) => {
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
        <FormRowVertical label="Full Name" name="name">
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
          <FormRowVertical label="Email Address" name="email">
            <Input
              type="email"
              id="email"
              name="email"
              disabled={formik.isSubmitting}
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
            />
          </FormRowVertical>

          <FormRowVertical label="Phone" name="phone">
            <Input
              type="text"
              id="phone"
              name="phone"
              disabled={formik.isSubmitting}
              placeholder="Enter phone number"
              {...formik.getFieldProps("phone")}
            />
          </FormRowVertical>
        </div>

        {/* Password + Confirm Password */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Password" name="password">
            <Input
              type="password"
              id="password"
              name="password"
              disabled={formik.isSubmitting}
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />
          </FormRowVertical>

          <FormRowVertical label="Confirm Password" name="confirmPassword">
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              disabled={formik.isSubmitting}
              placeholder="Confirm password"
              {...formik.getFieldProps("confirmPassword")}
            />
          </FormRowVertical>
        </div> */}

        {/* Address */}
        <FormRowVertical label="Address" name="address">
          <Input
            type="text"
            id="address"
            name="address"
            disabled={formik.isSubmitting}
            placeholder="Enter address"
            {...formik.getFieldProps("address")}
          />
        </FormRowVertical>

        {/* Class + Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Class" name="classId">
            <select
              id="classId"
              name="classId"
              className="block w-full px-4 py-2 border rounded-lg"
              disabled={formik.isSubmitting}
              {...formik.getFieldProps("classId")}
            >
              <option value="">Select Class</option>
              {classes?.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </FormRowVertical>

          <FormRowVertical label="Section" name="section">
            <Input
              type="text"
              id="section"
              name="section"
              disabled={formik.isSubmitting}
              placeholder="A/B/C"
              {...formik.getFieldProps("section")}
            />
          </FormRowVertical>
        </div>

        {/* Roll Number */}
        <FormRowVertical label="Roll Number" name="rollNumber">
          <Input
            type="text"
            id="rollNumber"
            name="rollNumber"
            disabled={formik.isSubmitting}
            placeholder="Leave empty to auto-generate"
            {...formik.getFieldProps("rollNumber")}
          />
        </FormRowVertical>

        {!isEditMode && (
          <p className="text-sm text-gray-500 italic">
            A secure password will be generated and sent to the student automatically.
          </p>
        )}

        {/* Submit */}
        <div>
          <Button fullWidth={true} type="submit" disabled={formik.isSubmitting} loading={isCreating}>
            {!isEditMode ? 'Add Student' : 'Edit Student'}
          </Button>
        </div>
      </form>
    </FormikProvider>

  )

}

export default CreateStudentForm