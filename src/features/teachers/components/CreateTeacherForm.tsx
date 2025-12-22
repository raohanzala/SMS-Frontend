import { FormikProvider, useFormik } from "formik";
import Button from "../../../components/common/Button";
import FormRowVertical from "../../../components/common/FormRowVerticle";
import Input from "../../../components/common/Input";
import { useAddTeacher } from "../hooks/useAddTeacher";
import { useUpdateTeacher } from "../hooks/useUpdateTeacher";
import { CreateTeacherFormProps } from "../types/teacher-components.types";
import { AddTeacherInput, UpdateTeacherInput } from "../types/teacher.types";
import { useClasses } from "@/features/classes/hooks/useClasses";
import EntitySelect from "../../../components/common/EntitySelect";
import ImageCropperInput from "../../../components/common/ImageCropperInput";
import RadioGroup from "../../../components/common/RadioGroup";
import { Class } from "@/features/classes/types/class.types";

const CreateTeacherForm = ({
  teacherToEdit,
  onManageTeacherModalClose,
}: CreateTeacherFormProps) => {
  const { addTeacherMutation, isAddingTeacher } = useAddTeacher();
  const { updateTeacherMutation, isUpdatingTeacher } = useUpdateTeacher();
  const { classes } = useClasses();

  const isLoadingTeacher = isAddingTeacher || isUpdatingTeacher;
  const isEditMode = !!teacherToEdit;

  const formik = useFormik({
    initialValues: {
      teacherName: teacherToEdit?.name || "",
      teacherEmail: teacherToEdit?.email || "",
      teacherPhone: teacherToEdit?.phone || "",
      teacherAddress: teacherToEdit?.address || "",
      teacherGender: teacherToEdit?.gender || "male",
      teacherSubjects: "",
      teacherAssignedClasses:
        Array.isArray(teacherToEdit?.assignedClasses)
          ? teacherToEdit.assignedClasses.map((c: Class | string) => 
              typeof c === "string" ? c : c._id
            )
          : [],
      teacherSalaryAmount: teacherToEdit?.salary?.amount || 0,
      teacherSalaryCurrency: teacherToEdit?.salary?.currency || "PKR",
      teacherProfileImage: teacherToEdit?.profileImage as File | string | undefined,
      teacherLevel: "1",
    },
    onSubmit: async (formValues) => {
      const formData = new FormData();
      formData.append("teacherName", formValues.teacherName);
      formData.append("teacherEmail", formValues.teacherEmail);
      if (formValues.teacherPhone) {
        formData.append("teacherPhone", formValues.teacherPhone);
      }
      if (formValues.teacherAddress) {
        formData.append("teacherAddress", formValues.teacherAddress);
      }
      formData.append("teacherGender", formValues.teacherGender);
      if (formValues.teacherSubjects) {
        formData.append(
          "teacherSubjects",
          formValues.teacherSubjects
            .split(",")
            .map((s: string) => s.trim())
            .join(",")
        );
      }
      if (formValues.teacherAssignedClasses.length > 0) {
        formValues.teacherAssignedClasses.forEach((classId: string) => {
          formData.append("teacherAssignedClasses", classId);
        });
      }
      formData.append("teacherSalaryAmount", formValues.teacherSalaryAmount.toString());
      formData.append("teacherSalaryCurrency", formValues.teacherSalaryCurrency);
      if (formValues.teacherProfileImage && typeof formValues.teacherProfileImage !== 'string') {
        formData.append("teacherProfileImage", formValues.teacherProfileImage);
      }

      // The API expects FormData for file uploads, but TypeScript types expect AddTeacherInput
      // We'll cast FormData to match the expected type structure
      const apiPayload = formData as unknown as AddTeacherInput;
      
      if (!isEditMode) {
        addTeacherMutation({ addTeacherInput: apiPayload }, {
          onSuccess: onManageTeacherModalClose,
        });
      } else {
        if (teacherToEdit?._id) {
          updateTeacherMutation(
            { teacherId: teacherToEdit._id, updateTeacherInput: formData as unknown as UpdateTeacherInput },
            { onSuccess: onManageTeacherModalClose }
          );
        }
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="space-y-8"
      >
        {/* Teacher Information Section */}
        <div className="bg-bg-main rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-8 py-5">
            <h3 className="text-xl font-semibold text-text-primary">Teacher Information</h3>
            <p className="text-sm text-text-secondary mt-1.5">Basic details and profile information</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Profile Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <ImageCropperInput
                    value={values.teacherProfileImage}
                    onChange={(file) => setFieldValue("teacherProfileImage", file)}
                    aspect={1}
                  />
                </div>
              </div>

              {/* Teacher Details */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormRowVertical
                  label="Full Name"
                  name="teacherName"
                  error={errors.teacherName as string | undefined}
                  required
                >
                  <Input
                    type="text"
                    {...getFieldProps("teacherName")}
                    placeholder="Enter full name"
                    disabled={isLoadingTeacher}
                  />
                </FormRowVertical>

                <FormRowVertical
                  label="Email Address"
                  name="teacherEmail"
                  error={errors.teacherEmail as string | undefined}
                  required
                >
                  <Input
                    type="email"
                    {...getFieldProps("teacherEmail")}
                    placeholder="Enter email"
                    disabled={isLoadingTeacher}
                  />
                </FormRowVertical>

                <FormRowVertical
                  label="Phone"
                  name="teacherPhone"
                  error={errors.teacherPhone as string | undefined}
                >
                  <Input
                    type="text"
                    {...getFieldProps("teacherPhone")}
                    placeholder="Enter phone number"
                    disabled={isLoadingTeacher}
                  />
                </FormRowVertical>

                <FormRowVertical
                  label="Gender"
                  name="teacherGender"
                  error={errors.teacherGender as string | undefined}
                  required
                >
                  <RadioGroup
                    name="gender"
                    value={values.teacherGender}
                    onChange={(gender) => setFieldValue("teacherGender", gender)}
                  />
                </FormRowVertical>
              </div>
            </div>

            <div className="mt-6">
              <FormRowVertical
                label="Address"
                name="teacherAddress"
                error={errors.teacherAddress as string | undefined}
              >
                <Input
                  type="text"
                  {...getFieldProps("teacherAddress")}
                  placeholder="Enter address"
                  disabled={isLoadingTeacher}
                />
              </FormRowVertical>
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="bg-bg-main rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-8 py-5">
            <h3 className="text-xl font-semibold text-text-primary">Professional Information</h3>
            <p className="text-sm text-text-secondary mt-1.5">Teaching assignments, subjects, and salary details</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormRowVertical
                label="Subjects"
                name="teacherSubjects"
                error={errors.teacherSubjects as string | undefined}
                helperText="Comma separated subjects (e.g. Math, English)"
              >
                <Input
                  type="text"
                  {...getFieldProps("teacherSubjects")}
                  placeholder="Comma separated subjects"
                  disabled={isLoadingTeacher}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Teacher Level"
                name="teacherLevel"
                error={errors.teacherLevel as string | undefined}
              >
                <EntitySelect
                  entity="static"
                  staticOptions={[
                    { value: "1", label: "Level 1" },
                    { value: "2", label: "Level 2" },
                    { value: "3", label: "Level 3" },
                  ]}
                  value={values.teacherLevel}
                  onChange={(value: string | string[] | null) => {
                    const level = Array.isArray(value) ? value[0] : value;
                    setFieldValue("teacherLevel", (level as string) || "1");
                  }}
                  placeholder="Select Teacher Level"
                  isDisabled={isLoadingTeacher}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Salary Amount"
                name="teacherSalaryAmount"
                error={errors.teacherSalaryAmount as string | undefined}
              >
                <Input
                  type="number"
                  {...getFieldProps("teacherSalaryAmount")}
                  placeholder="Enter salary amount"
                  disabled={isLoadingTeacher}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Currency"
                name="teacherSalaryCurrency"
                error={errors.teacherSalaryCurrency as string | undefined}
              >
                <EntitySelect
                  entity="static"
                  staticOptions={[
                    { value: "PKR", label: "PKR" },
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                  ]}
                  value={values.teacherSalaryCurrency}
                  onChange={(value: string | string[] | null) => {
                    const currency = Array.isArray(value) ? value[0] : value;
                    setFieldValue("teacherSalaryCurrency", (currency as string) || "PKR");
                  }}
                  placeholder="Select Currency"
                  isDisabled={isLoadingTeacher}
                />
              </FormRowVertical>
            </div>

            <div className="mt-6">
              <FormRowVertical
                label="Assigned Classes"
                name="teacherAssignedClasses"
                error={errors.teacherAssignedClasses as string | undefined}
                helperText="Hold Ctrl/Cmd to select multiple classes"
              >
                <select
                  id="teacherAssignedClasses"
                  name="teacherAssignedClasses"
                  multiple
                  className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[120px]"
                  disabled={isLoadingTeacher}
                  value={values.teacherAssignedClasses as string[]}
                  onChange={(e) =>
                    setFieldValue(
                      "teacherAssignedClasses",
                      Array.from(e.target.selectedOptions, (option) => option.value) as string[]
                    )
                  }
                >
                  {classes?.map((cls: { _id: string; name: string; section?: string }) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name}{cls.section ? ` - ${cls.section}` : ""}
                    </option>
                  ))}
                </select>
              </FormRowVertical>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
          <Button
            variant="outline"
            type="button"
            onClick={onManageTeacherModalClose}
            disabled={isLoadingTeacher}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoadingTeacher}
            loading={isLoadingTeacher}
          >
            {!isEditMode ? "Create Teacher" : "Update Teacher"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateTeacherForm;

