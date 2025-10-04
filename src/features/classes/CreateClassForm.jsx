import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useCreateClass } from './useCreateClass';
import { useUpdateClass } from './useUpdateClass';
import { useTeachers } from '../teachers/useTeachers';
import { useSubjects } from '../subjects/useSubjects';

function CreateClassForm({ classToEdit, onClose }) {
  const { createClass, isCreating } = useCreateClass();
  const { updateClass, isUpdating } = useUpdateClass();

  const { subjectData } = useSubjects()
  const { teachers } = useTeachers()
  console.log(subjectData)


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
        createClass(payload, {
          onSuccess: () => onClose?.(),
        });
      } else {
        updateClass(payload, {
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
      >
        {/* Class Name */}
        <FormRowVertical label="Class Name" name="name">
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter class name"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("name")}
          />
        </FormRowVertical>

        {/* Section */}
        <FormRowVertical label="Section" name="section">
          <Input
            type="text"
            id="section"
            name="section"
            placeholder="A/B/C"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("section")}
          />
        </FormRowVertical>

        {/* Subjects */}
        <FormRowVertical label="Subjects" name="subjects">
          <select
            id="subjects"
            name="subjects"
            className={`block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${formik.touched.subjects && formik.errors.subjects ? 'border-red-300' : 'border-gray-300'}`}
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('subjects')}
          >
            <option value="admin">Subject</option>
            {subjectData?.map((subject) => (
              <option key={subject?._id} value={subject?._id}>{subject?.name}</option>
            ))
            }
          </select>
        </FormRowVertical>

        <FormRowVertical label="Assigned Teachers" name="assignedTeachers">
          <select
            id="assignedTeachers"
            name="assignedTeachers"
            className={`block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${formik.touched.assignedTeachers && formik.errors.assignedTeachers ? 'border-red-300' : 'border-gray-300'}`}
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('assignedTeachers')}
          >
            <option value="admin">Teacher</option>
            {teachers?.map((teacher) => (
              <option key={teacher?._id} value={teacher?._id}>{teacher?.name}</option>
            ))
            }
          </select>
        </FormRowVertical>

        {/* Submit Button */}
        <div>
          <Button fullWidth={true} type="submit" disabled={formik.isSubmitting} loading={isCreating || isUpdating}>
            {!isEditMode ? "Create Class" : "Update Class"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateClassForm