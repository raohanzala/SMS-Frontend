import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '../../components/common/FormRowVerticle';
import Button from '../../components/common/Button';
// import { addStudentSchema } from '../../validations/validationSchemas';
import Input from '../../components/common/Input';
import { useCreateTeacher } from './useCreateTeacher';
import { useClasses } from '../classes/useClasses';

function CreateTeacherForm({ teacherToEdit, onClose }) {
  const { createTeacher, isCreating } = useCreateTeacher();
  const { classes } = useClasses()
  const isEditMode = !!teacherToEdit;

  const formik = useFormik({
    initialValues: {
      name: teacherToEdit?.name || "",
      email: teacherToEdit?.email || "",
      password: "",
      confirmPassword: "",
      phone: teacherToEdit?.phone || "",
      address: teacherToEdit?.address || "",
      subjects: teacherToEdit?.subjects?.join(", ") || "",
      assignedClasses: teacherToEdit?.assignedClasses?.map(cls => cls._id) || [],
      timetable: teacherToEdit?.timetable || []
    },
    // validationSchema: teacherSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        subjects: values.subjects
          ? values.subjects.split(",").map((s) => s.trim())
          : [],
      };

      if (!isEditMode) {
        createTeacher(payload, {
          onSuccess: () => {
            onClose?.();
          },
        });
      } else {
        // updateTeacher logic yahan dal sakte ho
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
            placeholder="Enter full name"
            disabled={formik.isSubmitting}
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
              placeholder="Enter email"
              disabled={formik.isSubmitting}
              {...formik.getFieldProps("email")}
            />
          </FormRowVertical>

          <FormRowVertical label="Phone" name="phone">
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              disabled={formik.isSubmitting}
              {...formik.getFieldProps("phone")}
            />
          </FormRowVertical>
        </div>

        {/* Password + Confirm Password */}
        {!isEditMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRowVertical label="Password" name="password">
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                disabled={formik.isSubmitting}
                {...formik.getFieldProps("password")}
              />
            </FormRowVertical>

            <FormRowVertical label="Confirm Password" name="confirmPassword">
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                disabled={formik.isSubmitting}
                {...formik.getFieldProps("confirmPassword")}
              />
            </FormRowVertical>
          </div>
        )}

        {/* Address */}
        <FormRowVertical label="Address" name="address">
          <Input
            type="text"
            id="address"
            name="address"
            placeholder="Enter address"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("address")}
          />
        </FormRowVertical>

        {/* Subjects */}
        <FormRowVertical label="Subjects" name="subjects">
          <Input
            type="text"
            id="subjects"
            name="subjects"
            placeholder="Comma separated subjects (e.g. Math, English)"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("subjects")}
          />
        </FormRowVertical>

        {/* Assigned Classes */}
        <FormRowVertical label="Assigned Classes" name="assignedClasses">
          <select
            id="assignedClasses"
            name="assignedClasses"
            multiple
            className="block w-full px-4 py-2 border rounded-lg"
            disabled={formik.isSubmitting}
            value={formik.values.assignedClasses}
            onChange={(e) =>
              formik.setFieldValue(
                "assignedClasses",
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="">Select Class</option>
            {/* Map through available classes */}
            {classes.map(cls => (
              <option key={cls._id} value={cls._id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Submit */}
        <div>
          <Button
            fullWidth={true}
            type="submit"
            disabled={formik.isSubmitting}
            loading={isCreating}
          >
            {!isEditMode ? "Add Teacher" : "Edit Teacher"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateTeacherForm