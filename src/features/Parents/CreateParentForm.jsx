import { FormikProvider, useFormik } from 'formik';
import React from 'react'
import FormRowVertical from '../../components/common/FormRowVerticle';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
// import { addParentSchema } from '../../validations/validationSchemas';
import { editParent } from '../../api/parents';
import { useCreateParent } from './useCreateParent';
import { useStudents } from '../students/useStudents';

function CreateParentForm({ parentToEdit, onClose }) {
  const { createParent, isCreating } = useCreateParent();
  const { students, isPending } = useStudents();

  const isEditMode = !!parentToEdit;

  const formik = useFormik({
    initialValues: {
      name: parentToEdit?.name || '',
      email: parentToEdit?.email || '',
      phone: parentToEdit?.phone || '',
      address: parentToEdit?.address || '',
      children: parentToEdit?.children || [],
    },
    // validationSchema: addParentSchema,
    onSubmit: async (values) => {
      if (!isEditMode) {
        createParent(values, {
          onSuccess: () => onClose?.(),
        });
      } else {
        editParent({ id: parentToEdit?._id, values }, {
          onSuccess: () => onClose?.(),
        });
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

        {/* Email + Phone */}
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

        {/* Children (Students) */}
        <FormRowVertical label="Select Children (Students)" name="children">
          <select
            id="children"
            name="children"
            multiple
            className="block w-full px-4 py-2 border rounded-lg"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("children")}
          >
            {students?.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.rollNumber})
              </option>
            ))}
          </select>
        </FormRowVertical>

        {!isEditMode && (
          <p className="text-sm text-gray-500 italic">
            A secure password will be generated and sent to the parent automatically.
          </p>
        )}

        {/* Submit */}
        <div>
          <Button fullWidth type="submit" disabled={formik.isSubmitting} loading={isCreating}>
            {!isEditMode ? 'Add Parent' : 'Edit Parent'}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateParentForm;
