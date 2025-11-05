import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useAddClass } from '../hooks/useAddClass';
import { useUpdateClass } from '../hooks/useUpdateClass';
import { useTeachers } from '../../teachers/hooks/useTeachers';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import { CreateClassFormProps } from '../types/class-components.interface';

const CreateClassForm = ({ classToEdit, onClose }: CreateClassFormProps) => {
  const { addClassMutation, isAddingClass } = useAddClass();
  const { updateClassMutation, isUpdatingClass } = useUpdateClass();

  const { subjectData } = useSubjects()
  const { teachers } = useTeachers()

  const isEditMode = !!classToEdit;

  const formik = useFormik({
    initialValues: {
      name: classToEdit?.name || "",
      section: classToEdit?.section || "",
      subjects: classToEdit?.subjects || [""],
      assignedTeachers: classToEdit?.assignedTeachers || [""],
    },
    onSubmit: async (values) => {
      console.log(values)
      const payload = {
        name: values.name,
        section: values.section,
        subjects: values.subjects,
        assignedTeachers: values.assignedTeachers,
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

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        {/* Class Name */}
        <FormRowVertical label="Class Name" name="name">
          <Input
            type="text"
            placeholder="Enter class name"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("name")}
          />
        </FormRowVertical>

        {/* Section */}
        <FormRowVertical label="Section" name="section">
          <Input
            type="text"
            placeholder="A/B/C"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("section")}
          />
        </FormRowVertical>

        {/* Subjects */}
        <FormRowVertical label="Subjects" name="subjects">
          <select
            className={`block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${formik.touched.subjects && formik.errors.subjects ? 'border-red-300' : 'border-gray-300'}`}
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('subjects')}
          >
            <option value="admin">Subject</option>
            {subjectData?.map((subject: { _id: string; name: string }) => (
              <option key={subject?._id} value={subject?._id}>{subject?.name}</option>
            ))
            }
          </select>
        </FormRowVertical>

        <FormRowVertical label="Assigned Teachers" name="assignedTeachers">
          <select
            className={`block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${formik.touched.assignedTeachers && formik.errors.assignedTeachers ? 'border-red-300' : 'border-gray-300'}`}
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('assignedTeachers')}
          >
            <option value="admin">Teacher</option>
            {teachers?.map((teacher: { _id: string; name: string }) => (
              <option key={teacher?._id} value={teacher?._id}>{teacher?.name}</option>
            ))
            }
          </select>
        </FormRowVertical>

        {/* Submit Button */}
        <div>
          <Button fullWidth={true} type="submit" disabled={formik.isSubmitting} loading={isAddingClass || isUpdatingClass}>
            {!isEditMode ? "Add Class" : "Update Class"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateClassForm