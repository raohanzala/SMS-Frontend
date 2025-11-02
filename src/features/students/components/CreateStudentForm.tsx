import { useCallback, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import Button from "../../../components/common/Button";
import EntitySelect from "../../../components/common/EntitySelect";
import FormRowVertical from "../../../components/common/FormRowVerticle";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import CreateParentForm from "../../Parents/CreateParentForm";
import { useAddStudent } from "../hooks/useAddStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import { Parent } from "../../../types/user.types";
import { addStudentSchema } from "../validations/student.validation";
import { CreateStudentFormProps } from "../types/student-components.types";

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
      if (!isEditMode) {
        addStudentMutation(formValues, { onSuccess: onManageStudentModalClose });
      } else {
        updateStudentMutation(
          { studentId: studentToEdit._id, updateStudentInput: formValues },
          { onSuccess: onManageStudentModalClose }
        );
      }
    },
  });

  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  console.log(getFieldProps("studentName"));
  console.log(errors);

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
          className="space-y-4"
        >
          <FormRowVertical label="Full Name" name="studentName" error={errors.studentName}>
            <Input
              type="text"
              {...getFieldProps("studentName")}
              placeholder="Enter full name"
              disabled={isLoadingStudent}
            />
          </FormRowVertical>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRowVertical label="Email Address" name="studentEmail" error={errors.studentEmail}>
              <Input
                type="email"
                {...getFieldProps("studentEmail")}
                placeholder="Enter email"
                disabled={isLoadingStudent}
              />
            </FormRowVertical>

            <FormRowVertical label="Phone" name="studentPhone" error={errors.studentPhone}>
              <Input
                type="text"
                {...getFieldProps("studentPhone")}
                placeholder="Enter phone number"
                disabled={isLoadingStudent}
              />
            </FormRowVertical>
          </div>

          <FormRowVertical label="Address" name="studentAddress" error={errors.studentAddress}>
            <Input
              type="text"
              {...getFieldProps("studentAddress")}
              placeholder="Enter address"
              disabled={isLoadingStudent}
            />
          </FormRowVertical>

          <FormRowVertical label="Gender" name="studentGender" error={errors.studentGender} >
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="studentGender"
                  value="male"
                  checked={values.studentGender === "male"}
                  onChange={() => setFieldValue("studentGender", "male")}
                  disabled={isLoadingStudent}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="studentGender"
                  value="female"
                  checked={values.studentGender === "female"}
                  onChange={() => setFieldValue("studentGender", "female")}
                  disabled={isLoadingStudent}
                />
                Female
              </label>
            </div>
          </FormRowVertical>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRowVertical label="Class" name="studentClassId" error={errors.studentClassId}>
              <EntitySelect
                entity="class"
                value={values.studentClassId}
                onChange={(classId: string) => setFieldValue("studentClassId", classId)}
              />
            </FormRowVertical>

            <FormRowVertical label="Roll Number" name="studentRollNumber" error={errors.studentRollNumber}>
              <Input
                type="text"
                {...getFieldProps("studentRollNumber")}
                placeholder="Leave empty to auto-generate"
                disabled={isLoadingStudent}
              />
            </FormRowVertical>
          </div>

          <FormRowVertical label="Parent" name="studentParentId" error={errors.studentParentId}>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <EntitySelect
                  entity="parent"
                  value={values.studentParentId}
                  onChange={(parentId: string) =>
                    setFieldValue("studentParentId", parentId)
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowParentModal(true)}
              >
                + Add Parent
              </Button>
            </div>
          </FormRowVertical>

          <div>
            <Button
              fullWidth
              type="submit"
              disabled={isLoadingStudent}
              loading={isLoadingStudent}
            >
              {!isEditMode ? "Add Student" : "Edit Student"}
            </Button>
          </div>
        </form>
      </FormikProvider>

      <Modal isOpen={showParentModal} onClose={handleParentModalClose}>
        <CreateParentForm
          onClose={handleParentModalClose}
          context="student"
          onSuccess={(newParent: Parent) =>
            setFieldValue("parent", newParent._id)
          }
        />
      </Modal>
    </>
  );
}

export default CreateStudentForm;
