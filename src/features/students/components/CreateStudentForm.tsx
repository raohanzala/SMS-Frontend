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
import { Student } from "../types/student.types";
import { Parent } from "../../../types/user.types";
import { addStudentSchema } from "../validations/student.validation";


interface CreateStudentFormProps {
  studentToEdit: Student | null;
  onManageStudentModalClose: () => void;
}

function CreateStudentForm({
  studentToEdit,
  onManageStudentModalClose,
}: CreateStudentFormProps) {
  const [showParentModal, setShowParentModal] = useState(false);

  const { addStudentMutation, isAddingStudent } = useAddStudent();
  const { updateStudentMutation, isUpdatingStudent } = useUpdateStudent();

  const isLoadingStudent = isAddingStudent || isUpdatingStudent;
  const isEditMode = !!studentToEdit;

  const formik = useFormik({
    initialValues: {
      name: studentToEdit?.name || "",
      email: studentToEdit?.email || "",
      phone: studentToEdit?.phone || "",
      address: studentToEdit?.address || "",
      gender: studentToEdit?.gender || "male",
      class: studentToEdit?.class?._id || "",
      rollNumber: studentToEdit?.rollNumber || "",
      parent: studentToEdit?.parent?._id || null,
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
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

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
          <FormRowVertical label="Full Name" name="name">
            <Input
              type="text"
              {...getFieldProps("name")}
              placeholder="Enter full name"
              disabled={isLoadingStudent}
            />
          </FormRowVertical>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRowVertical label="Email Address" name="email">
              <Input
                type="email"
                {...getFieldProps("email")}
                placeholder="Enter email"
                disabled={isLoadingStudent}
              />
            </FormRowVertical>

            <FormRowVertical label="Phone" name="phone">
              <Input
                type="text"
                {...getFieldProps("phone")}
                placeholder="Enter phone number"
                disabled={isLoadingStudent}
              />
            </FormRowVertical>
          </div>

          <FormRowVertical label="Address" name="address">
            <Input
              type="text"
              {...getFieldProps("address")}
              placeholder="Enter address"
              disabled={isLoadingStudent}
            />
          </FormRowVertical>

          <FormRowVertical label="Gender" name="gender">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={() => setFieldValue("gender", "male")}
                  disabled={isLoadingStudent}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={() => setFieldValue("gender", "female")}
                  disabled={isLoadingStudent}
                />
                Female
              </label>
            </div>
            {touched.gender && errors.gender && (
              <div className="text-red-500 text-sm">{errors.gender}</div>
            )}
          </FormRowVertical>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRowVertical label="Class" name="class">
              <EntitySelect
                entity="class"
                value={values.class}
                onChange={(classId: string) => setFieldValue("class", classId)}
              />
            </FormRowVertical>

            <FormRowVertical label="Roll Number" name="rollNumber">
              <Input
                type="text"
                {...getFieldProps("rollNumber")}
                placeholder="Leave empty to auto-generate"
                disabled={isLoadingStudent}
              />
            </FormRowVertical>
          </div>

          <FormRowVertical label="Parent" name="parent">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <EntitySelect
                  entity="parent"
                  value={values.parent}
                  onChange={(parentId: string) =>
                    setFieldValue("parent", parentId)
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
