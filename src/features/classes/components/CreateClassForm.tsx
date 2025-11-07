import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useAddClass } from '../hooks/useAddClass';
import { useUpdateClass } from '../hooks/useUpdateClass';
import { useTeachers } from '../../teachers/hooks/useTeachers';
import { CreateClassFormProps } from '../types/class-components.interface';
import { addClassSchema } from '../validation/class.validation';
import EntitySelect from '@/components/common/EntitySelect';

const CreateClassForm = ({ classToEdit, onClose }: CreateClassFormProps) => {
  const { addClassMutation, isAddingClass } = useAddClass();
  const { updateClassMutation, isUpdatingClass } = useUpdateClass();

  const { teachers } = useTeachers()

  const isEditMode = !!classToEdit;

  const formik = useFormik({
    initialValues: {
      className: classToEdit?.name || "",
      classMonthlyTuitionFee: classToEdit?.monthlyTuitionFee ?? 0,
      classTeacherId:
        (typeof classToEdit?.classTeacher === 'object' && classToEdit?.classTeacher?._id) ||
        (typeof classToEdit?.classTeacher === 'string' ? classToEdit?.classTeacher : ""),
    },
    validationSchema: addClassSchema,
    onSubmit: async (values) => {
      const payload = {
        className: values.className,
        classMonthlyTuitionFee: Number(values.classMonthlyTuitionFee),
        classTeacherId: values.classTeacherId,
      };

      if (!isEditMode) {
        addClassMutation(payload, {
          onSuccess: () => onClose?.(),
        });
      } else {
        if (classToEdit?._id) {
          updateClassMutation({ classId: classToEdit._id, classData: payload }, {
            onSuccess: () => onClose?.(),
          });
        }
      }
    },
  });

  const { errors, getFieldProps, handleSubmit, values } = formik;
  console.log("values", values);

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        {/* Class Name */}
        <FormRowVertical label="Class Name" name="className" error={errors.className}>
          <Input
            type="text"
            placeholder="Enter class name"
            // disabled={.isSubmitting}
            {...getFieldProps("className")}
          />
        </FormRowVertical>

        {/* Monthly Tuition Fee */}
        <FormRowVertical label="Monthly Tuition Fee" name="classMonthlyTuitionFee" error={errors.classMonthlyTuitionFee}>
          <Input
            type="number"
            placeholder="e.g. 5000"
            // disabled={.isSubmitting}
            {...getFieldProps("classMonthlyTuitionFee")}
          />
        </FormRowVertical>

        <FormRowVertical label="Class Teacher" name="classTeacherId">
          <EntitySelect
            entity="teacher"
            value={formik.values.classTeacherId}
            onChange={(teacherId: string | null) => formik.setFieldValue("classTeacherId", teacherId || "")}
          />
        </FormRowVertical>

        {/* Submit Button */}
        <div>
          <Button fullWidth={true} type="submit" loading={isAddingClass || isUpdatingClass}>
            {!isEditMode ? "Add Class" : "Update Class"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateClassForm