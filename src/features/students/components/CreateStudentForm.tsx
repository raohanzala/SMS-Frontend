import { useCallback, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import Button from "../../../components/common/Button";
import EntitySelect from "../../../components/common/EntitySelect";
import FormRowVertical from "../../../components/common/FormRowVerticle";
import Input from "../../../components/common/Input";
import ManageParentModal from "@/features/parents/components/ManageParentModal";
import { useAddStudent } from "../hooks/useAddStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import { addStudentSchema } from "../validations/student.validation";
import { CreateStudentFormProps } from "../types/student-components.types";
import { Parent } from "@/features/parents/types/parent.types";

const CreateStudentForm = ({
  studentToEdit, 
  onManageStudentModalClose,
}: CreateStudentFormProps) => {
  const [showParentModal, setShowParentModal] = useState(false);

  const { addStudentMutation, isAddingStudent } = useAddStudent();
  const { updateStudentMutation, isUpdatingStudent } = useUpdateStudent();

  const isLoadingStudent = isAddingStudent || isUpdatingStudent;
  const isEditMode = !!studentToEdit;

  const formik = useFormik({
    initialValues: {
      studentName: studentToEdit?.name || "",
      studentEmail: studentToEdit?.email || "",
      studentPhone: studentToEdit?.phone || "",
      studentAddress: studentToEdit?.address || "",
      studentGender: studentToEdit?.gender || "male",
      studentRollNumber: studentToEdit?.rollNumber || "",
      studentClassId: studentToEdit?.class?._id || "",
      studentParentId: studentToEdit?.parent?._id || null,
    },
    validationSchema: addStudentSchema,
    onSubmit: async (formValues) => {
      // Transform form values to API format
      const apiPayload = {
        name: formValues.studentName,
        email: formValues.studentEmail,
        phone: formValues.studentPhone,
        address: formValues.studentAddress,
        gender: formValues.studentGender,
        rollNumber: formValues.studentRollNumber,
        classId: formValues.studentClassId,
        parentId: formValues.studentParentId,
      };

      if (!isEditMode) {
        addStudentMutation(apiPayload, {
          onSuccess: onManageStudentModalClose,
        });
      } else {
        updateStudentMutation(
          { studentId: studentToEdit._id, updateStudentInput: apiPayload },
          { onSuccess: onManageStudentModalClose }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleParentModalClose = useCallback(() => {
    setShowParentModal(false);
  }, []);

  return (
    <>
      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="space-y-6"
        >
          {/* Student Information Section */}
          <div className="bg-bg-main rounded-xl border border-border p-6 space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-lg font-semibold text-text-primary">Student Information</h3>
              <p className="text-sm text-text-secondary mt-1">Basic details about the student</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormRowVertical
                label="Full Name"
                name="studentName"
                error={errors.studentName}
                required
              >
                <Input
                  type="text"
                  {...getFieldProps("studentName")}
                  placeholder="Enter full name"
                  disabled={isLoadingStudent}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Email Address"
                name="studentEmail"
                error={errors.studentEmail}
                required
              >
                <Input
                  type="email"
                  {...getFieldProps("studentEmail")}
                  placeholder="Enter email"
                  disabled={isLoadingStudent}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Phone"
                name="studentPhone"
                error={errors.studentPhone}
              >
                <Input
                  type="text"
                  {...getFieldProps("studentPhone")}
                  placeholder="Enter phone number"
                  disabled={isLoadingStudent}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Gender"
                name="studentGender"
                error={errors.studentGender}
                required
              >
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="studentGender"
                      value="male"
                      checked={values.studentGender === "male"}
                      onChange={() => setFieldValue("studentGender", "male")}
                      disabled={isLoadingStudent}
                      className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-text-primary">Male</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="studentGender"
                      value="female"
                      checked={values.studentGender === "female"}
                      onChange={() => setFieldValue("studentGender", "female")}
                      disabled={isLoadingStudent}
                      className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-text-primary">Female</span>
                  </label>
                </div>
              </FormRowVertical>
            </div>

            <FormRowVertical
              label="Address"
              name="studentAddress"
              error={errors.studentAddress}
            >
              <Input
                type="text"
                {...getFieldProps("studentAddress")}
                placeholder="Enter address"
                disabled={isLoadingStudent}
              />
            </FormRowVertical>
          </div>

          {/* Academic Information Section */}
          <div className="bg-bg-main rounded-xl border border-border p-6 space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-lg font-semibold text-text-primary">Academic Information</h3>
              <p className="text-sm text-text-secondary mt-1">Class and enrollment details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormRowVertical
                label="Class"
                name="studentClassId"
                error={errors.studentClassId}
                required
              >
                <EntitySelect
                  entity="class"
                  value={values.studentClassId}
                  onChange={(value: string | string[] | null) => {
                    const classId = Array.isArray(value) ? value[0] : value;
                    setFieldValue("studentClassId", classId || "");
                  }}
                  isDisabled={isLoadingStudent}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Roll Number"
                name="studentRollNumber"
                error={errors.studentRollNumber}
                helperText="Leave empty to auto-generate"
              >
                <Input
                  type="text"
                  {...getFieldProps("studentRollNumber")}
                  placeholder="Leave empty to auto-generate"
                  disabled={isLoadingStudent}
                />
              </FormRowVertical>
            </div>

            <FormRowVertical
              label="Parent"
              name="studentParentId"
              error={errors.studentParentId}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                <EntitySelect
                  entity="parent"
                  value={values.studentParentId}
                  onChange={(value: string | string[] | null) => {
                    const parentId = Array.isArray(value) ? value[0] : value;
                    setFieldValue("studentParentId", parentId || null);
                  }}
                  isDisabled={isLoadingStudent}
                />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowParentModal(true)}
                  disabled={isLoadingStudent}
                  className="whitespace-nowrap"
                >
                  + Add Parent
                </Button>
              </div>
            </FormRowVertical>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onManageStudentModalClose}
              disabled={isLoadingStudent}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoadingStudent}
              loading={isLoadingStudent}
            >
              {!isEditMode ? "Create Student" : "Update Student"}
            </Button>
          </div>
        </form>
      </FormikProvider>

      <ManageParentModal
        isManageParentModalOpen={showParentModal}
        onManageParentModalClose={handleParentModalClose}
        parentFormContext="student"
        onParentFormSuccess={(newParent: Parent) =>
          setFieldValue("studentParentId", newParent._id)
        }
      />
    </>
  );
};

export default CreateStudentForm;
