import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAddClass } from "../hooks/useAddClass";
import { useUpdateClass } from "../hooks/useUpdateClass";
import { CreateClassFormProps } from "../types/class-components.interface";
import { addClassSchema } from "../validation/class.validation";
import EntitySelect from "@/components/common/EntitySelect";
import { useSettings } from "@/features/settings/hooks/useSettings";

const CreateClassForm = ({ classToEdit, onClose }: CreateClassFormProps) => {
  const { addClassMutation, isAddingClass } = useAddClass();
  const { updateClassMutation, isUpdatingClass } = useUpdateClass();
  const { settings } = useSettings();
  const classLevels = settings?.timetable?.classLevels || [];

  const isEditMode = !!classToEdit;
  const isClassLoading = isAddingClass || isUpdatingClass;

  const formik = useFormik({
    initialValues: {
      name: classToEdit?.name || "",
      monthlyFee: classToEdit?.monthlyFee ?? 0,
      classTeacherId: classToEdit?.classTeacher?._id || "",
      levelId: classToEdit?.level?._id || "",
    },
    validationSchema: addClassSchema,
    onSubmit: async (formValues) => {
      if (!isEditMode) {
        addClassMutation(
          { addClassInput: formValues },
          {
            onSuccess: () => onClose?.(),
          }
        );
      } else {
        if (classToEdit?._id) {
          updateClassMutation(
            { classId: classToEdit._id, updateClassInput: formValues },
            {
              onSuccess: () => onClose?.(),
            }
          );
        }
      }
    },
  });

  const { errors, values, setFieldValue, getFieldProps, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="space-y-4">
        <FormRowVertical
          label="Class Teacher"
          name="classTeacherId"
          error={errors.classTeacherId}
          required
        >
          <EntitySelect
            entity="teacher"
            value={values.classTeacherId}
            onChange={(teacherId) => setFieldValue("classTeacherId", teacherId)}
            isDisabled={isClassLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="Class Level" name="level" error={errors.levelId} required>
          <EntitySelect
            entity="static"
            staticOptions={classLevels.map((classLevel) => ({
              value: classLevel._id,
              label: classLevel.name,
            }))}
            value={values.levelId}
            onChange={(levelId) => setFieldValue("levelId", levelId)}
            placeholder="Select Class Level"
            isDisabled={isClassLoading}
          />
        </FormRowVertical>

        {/* Class Name */}
        <FormRowVertical label="Class Name" name="name" error={errors.name} required>
          <Input
            type="text"
            placeholder="Enter class name"
            disabled={isClassLoading}
            {...getFieldProps("name")}
          />
        </FormRowVertical>

        {/* Monthly Tuition Fee */}
        <FormRowVertical
          label="Monthly Tuition Fee"
          name="monthlyFee"
          error={errors.monthlyFee}
        >
          <Input
            type="number"
            placeholder="e.g. 5000"
            disabled={isClassLoading}
            {...getFieldProps("monthlyFee")}
          />
        </FormRowVertical>
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <Button fullWidth={true} size="lg" type="submit" loading={isClassLoading} >
            {!isEditMode ? "Add Class" : "Update Class"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateClassForm;
