import { FormikProvider, useFormik } from "formik";
import Button from "../../../components/common/Button";
import FormRowVertical from "../../../components/common/FormRowVerticle";
import Input from "../../../components/common/Input";
import { useAddTeacher } from "../hooks/useAddTeacher";
import { useUpdateTeacher } from "../hooks/useUpdateTeacher";
import { CreateTeacherFormProps } from "../types/teacher-components.types";
import { useClasses } from "@/features/classes/hooks/useClasses";
import EntitySelect from "../../../components/common/EntitySelect";

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
      teacherSubjects: Array.isArray(teacherToEdit?.subjects)
        ? typeof teacherToEdit.subjects[0] === "string"
          ? teacherToEdit.subjects.join(", ")
          : teacherToEdit.subjects.map((s: { name: string }) => s.name).join(", ")
        : "",
      teacherAssignedClasses:
        Array.isArray(teacherToEdit?.assignedClasses) &&
        typeof teacherToEdit.assignedClasses[0] === "object"
          ? teacherToEdit.assignedClasses.map((c: { _id: string }) => c._id)
          : teacherToEdit?.assignedClasses || [],
      teacherSalaryAmount: teacherToEdit?.salary?.amount || 0,
      teacherSalaryCurrency: teacherToEdit?.salary?.currency || "PKR",
      teacherProfileImage: undefined as File | undefined,
      teacherLevel: teacherToEdit?.level || "1",
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
            .map((s) => s.trim())
            .join(",")
        );
      }
      if (formValues.teacherAssignedClasses.length > 0) {
        formValues.teacherAssignedClasses.forEach((classId) => {
          formData.append("teacherAssignedClasses", classId);
        });
      }
      formData.append("teacherSalaryAmount", formValues.teacherSalaryAmount.toString());
      formData.append("teacherSalaryCurrency", formValues.teacherSalaryCurrency);
      if (formValues.teacherProfileImage) {
        formData.append("teacherProfileImage", formValues.teacherProfileImage);
      }

      if (!isEditMode) {
        addTeacherMutation(formData, {
          onSuccess: onManageTeacherModalClose,
        });
      } else {
        if (teacherToEdit?._id) {
          updateTeacherMutation(
            { teacherId: teacherToEdit._id, formData },
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
        className="space-y-4"
      >
        <FormRowVertical
          label="Full Name"
          name="teacherName"
          error={errors.teacherName}
        >
          <Input
            type="text"
            {...getFieldProps("teacherName")}
            placeholder="Enter full name"
            disabled={isLoadingTeacher}
          />
        </FormRowVertical>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical
            label="Email Address"
            name="teacherEmail"
            error={errors.teacherEmail}
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
            error={errors.teacherPhone}
          >
            <Input
              type="text"
              {...getFieldProps("teacherPhone")}
              placeholder="Enter phone number"
              disabled={isLoadingTeacher}
            />
          </FormRowVertical>
        </div>

        <FormRowVertical
          label="Address"
          name="teacherAddress"
          error={errors.teacherAddress}
        >
          <Input
            type="text"
            {...getFieldProps("teacherAddress")}
            placeholder="Enter address"
            disabled={isLoadingTeacher}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Gender"
          name="teacherGender"
          error={errors.teacherGender}
        >
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="teacherGender"
                value="male"
                checked={values.teacherGender === "male"}
                onChange={() => setFieldValue("teacherGender", "male")}
                disabled={isLoadingTeacher}
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="teacherGender"
                value="female"
                checked={values.teacherGender === "female"}
                onChange={() => setFieldValue("teacherGender", "female")}
                disabled={isLoadingTeacher}
              />
              Female
            </label>
          </div>
        </FormRowVertical>

        <FormRowVertical
          label="Subjects"
          name="teacherSubjects"
          error={errors.teacherSubjects}
        >
          <Input
            type="text"
            {...getFieldProps("teacherSubjects")}
            placeholder="Comma separated subjects (e.g. Math, English)"
            disabled={isLoadingTeacher}
          />
        </FormRowVertical>

        <FormRowVertical
            label="Teacher Level"
            name="teacherLevel"
            error={errors.teacherLevel}
          >
            <EntitySelect
              entity="static"
              staticOptions={[
                { value: "1", label: "Level 1" },
                { value: "2", label: "Level 2" },
                { value: "3", label: "Level 3" },
              ]}
              value={values.teacherLevel}
              onChange={(level) => setFieldValue("teacherLevel", level as string)}
              placeholder="Select Teacher Level"
              isDisabled={isLoadingTeacher}
            />
          </FormRowVertical>

        <FormRowVertical
          label="Assigned Classes"
          name="teacherAssignedClasses"
          error={errors.teacherAssignedClasses}
        >
          <select
            id="teacherAssignedClasses"
            name="teacherAssignedClasses"
            multiple
            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoadingTeacher}
            value={values.teacherAssignedClasses}
            onChange={(e) =>
              setFieldValue(
                "teacherAssignedClasses",
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="">Select Classes</option>
            {classes?.map((cls: { _id: string; name: string; section: string }) => (
              <option key={cls._id} value={cls._id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
        </FormRowVertical>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical
            label="Salary Amount"
            name="teacherSalaryAmount"
            error={errors.teacherSalaryAmount}
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
            error={errors.teacherSalaryCurrency}
          >
            <EntitySelect
              entity="static"
              staticOptions={[
                { value: "PKR", label: "PKR" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
              ]}
              value={values.teacherSalaryCurrency}
              onChange={(currency) => setFieldValue("teacherSalaryCurrency", currency as string)}
              placeholder="Select Currency"
              isDisabled={isLoadingTeacher}
            />
          </FormRowVertical>
        </div>

        <FormRowVertical
          label="Profile Image"
          name="teacherProfileImage"
          error={errors.teacherProfileImage}
        >
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFieldValue("teacherProfileImage", file);
              }
            }}
            disabled={isLoadingTeacher}
          />
        </FormRowVertical>

        <div>
          <Button
            fullWidth={true}
            type="submit"
            disabled={isLoadingTeacher}
            loading={isLoadingTeacher}
          >
            {!isEditMode ? "Add Teacher" : "Update Teacher"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateTeacherForm;

