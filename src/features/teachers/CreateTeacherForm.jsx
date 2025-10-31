import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Button from '@/components/common/Button';
// import { addStudentSchema } from '@/validations/validationSchemas';
import Input from '@/components/common/Input';
import { useCreateTeacher } from './useCreateTeacher';
import { useClasses } from '../classes/useClasses';

function CreateTeacherForm({ teacherToEdit, onClose }) {
  const { createTeacher, isCreating } = useCreateTeacher();
  const { classes } = useClasses();

  const isEditMode = !!teacherToEdit;

  const formik = useFormik({
    initialValues: {
      name: teacherToEdit?.name || "",
      email: teacherToEdit?.email || "",
      phone: teacherToEdit?.phone || "",
      address: teacherToEdit?.address || "",
      gender: teacherToEdit?.gender || "",
      subjects: teacherToEdit?.subjects?.join(", ") || "",
      assignedClasses: teacherToEdit?.assignedClasses?.map(cls => cls._id) || [],
      salaryAmount: teacherToEdit?.salary?.amount || 0,
      salaryCurrency: teacherToEdit?.salary?.currency || "PKR",
      timetable: teacherToEdit?.timetable || []
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        subjects: values.subjects
          ? values.subjects.split(",").map((s) => s.trim())
          : [],
        salary: {
          amount: values.salaryAmount,
          currency: values.salaryCurrency,
        },
      };

      if (!isEditMode) {
        createTeacher(payload, {
          onSuccess: () => {
            onClose?.();
          },
        });
      } else {
        // TODO: updateTeacher logic
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

        {/* ✅ Gender Selection */}
        <FormRowVertical label="Gender" name="gender">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={() => formik.setFieldValue("gender", "male")}
              // disabled={isLoading}
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={() => formik.setFieldValue("gender", "female")}
              // disabled={isLoading}
              />
              Female
            </label>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-sm">{formik.errors.gender}</div>
          )}
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
            {classes?.map(cls => (
              <option key={cls._id} value={cls._id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Salary Amount" name="salaryAmount">
            <Input
              type="number"
              id="salaryAmount"
              name="salaryAmount"
              placeholder="Enter salary amount"
              disabled={formik.isSubmitting}
              {...formik.getFieldProps("salaryAmount")}
            />
          </FormRowVertical>

          <FormRowVertical label="Currency" name="salaryCurrency">
            <select
              id="salaryCurrency"
              name="salaryCurrency"
              className="block w-full px-4 py-2 border rounded-lg"
              disabled={formik.isSubmitting}
              value={formik.values.salaryCurrency}
              onChange={(e) => formik.setFieldValue("salaryCurrency", e.target.value)}
            >
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </FormRowVertical>
        </div>

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