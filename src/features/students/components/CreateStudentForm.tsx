import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import { addStudentSchema } from "@/validations/validationSchemas";
import Input from "@/components/common/Input";
import EntitySelect from "@/components/common/EntitySelect";
import { useCallback, useState } from "react";
import CreateParentForm from "../../Parents/CreateParentForm";
import Modal from "@/components/common/Modal";
import { useCreateStudent } from "../hooks/useCreateStudent";
import { useEditStudent } from "../hooks/useEditStudets";
import { Student } from "../types/student.types";
import { Parent } from "@/types/user.types";

interface CreateStudentFormProps {
  studentToEdit: Student | null;
  onManageStudentModalClose: () => void;
}

function CreateStudentForm({
  studentToEdit,
  onManageStudentModalClose,
}: CreateStudentFormProps) {
  const [showParentModal, setShowParentModal] = useState(false);

  const { createStudentMutation, isCreatingStudent } = useCreateStudent();
  const { editStudentMutation, isUpdatingStudent } = useEditStudent();

  const isLoadingStudent = isCreatingStudent || isUpdatingStudent;
  const isEditMode = !!studentToEdit;

  const formik = useFormik({
    initialValues: {
      name: studentToEdit?.name || "",
      email: studentToEdit?.email || "",
      phone: studentToEdit?.phone || "",
      address: studentToEdit?.address || "",
      gender: studentToEdit?.gender || "",
      class: studentToEdit?.class?._id || "",
      rollNumber: studentToEdit?.rollNumber || "",
      parent: studentToEdit?.parent?._id || null,
    },
    validationSchema: addStudentSchema,
    onSubmit: async (values) => {
      if (!isEditMode) {
        createStudentMutation(values, { onSuccess: onManageStudentModalClose });
      } else {
        editStudentMutation(
          { id: studentToEdit._id, values },
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
          {/* Name */}
          <FormRowVertical label="Full Name" name="name">
            <Input
              type="text"
              {...getFieldProps("name")}
              placeholder="Enter full name"
              disabled={isLoadingStudent}
            />
          </FormRowVertical>

          {/* Email + Phone */}
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

          {/* Address */}
          <FormRowVertical label="Address" name="address">
            <Input
              type="text"
              {...getFieldProps("address")}
              placeholder="Enter address"
              disabled={isLoadingStudent}
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

          {/* Class + Roll Number */}
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

          {/* Submit */}
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
