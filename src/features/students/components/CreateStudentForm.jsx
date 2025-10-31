import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import { addStudentSchema } from "@/validations/validationSchemas";
import Input from "@/components/common/Input";
import EntitySelect from "@/components/common/EntitySelect";
import { useState } from "react";
import CreateParentForm from "../../Parents/CreateParentForm";
import Modal from "@/components/common/Modal";
// import { useCreateStudent } from "../useCreateStudent";
import { useCreateStudent } from '../hooks/useCreateStudent'
import { useEditStudent } from "../hooks/useEditStudets";

function CreateStudentForm({ studentToEdit, onClose }) {
  const { createStudent, isCreating } = useCreateStudent();
  const { editStudentMutation, isUpdatingStudent } = useEditStudent();

  const [showParentModal, setShowParentModal] = useState(false);

  const isLoading = isCreating || isUpdatingStudent;
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
        createStudent(values, { onSuccess: onClose });
      } else {
        editStudentMutation({ id: studentToEdit._id, values }, { onSuccess: onClose });
      }
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          className="space-y-4"
        >
          {/* Name */}
          <FormRowVertical label="Full Name" name="name">
            <Input
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="Enter full name"
              disabled={isLoading}
            />
          </FormRowVertical>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRowVertical label="Email Address" name="email">
              <Input
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Enter email"
                disabled={isLoading}
              />
            </FormRowVertical>

            <FormRowVertical label="Phone" name="phone">
              <Input
                type="text"
                {...formik.getFieldProps("phone")}
                placeholder="Enter phone number"
                disabled={isLoading}
              />
            </FormRowVertical>
          </div>

          {/* Address */}
          <FormRowVertical label="Address" name="address">
            <Input
              type="text"
              {...formik.getFieldProps("address")}
              forkim={formik}
              placeholder="Enter address"
              disabled={isLoading}
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
                  checked={formik.values.gender === "male"}
                  onChange={() => formik.setFieldValue("gender", "male")}
                  disabled={isLoading}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formik.values.gender === "female"}
                  onChange={() => formik.setFieldValue("gender", "female")}
                  disabled={isLoading}
                />
                Female
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
          </FormRowVertical>

          {/* Class + Roll Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRowVertical label="Class" name="class">
              <EntitySelect
                entity="class"
                value={formik.values.class}
                onChange={(id) => formik.setFieldValue("class", id)}
              />
            </FormRowVertical>

            <FormRowVertical label="Roll Number" name="rollNumber">
              <Input
                type="text"
                {...formik.getFieldProps("rollNumber")}
                placeholder="Leave empty to auto-generate"
                disabled={isLoading}
              />
            </FormRowVertical>
          </div>

          <FormRowVertical label="Parent" name="parent">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <EntitySelect
                  entity="parent"
                  value={formik.values.parent}
                  onChange={(id) => formik.setFieldValue("parent", id)}
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
              disabled={isLoading}
              loading={isLoading}
            >
              {!isEditMode ? "Add Student" : "Edit Student"}
            </Button>
          </div>
        </form>
      </FormikProvider>

      <Modal isOpen={showParentModal} onClose={() => setShowParentModal(false)}>
        <CreateParentForm
          onClose={() => setShowParentModal(false)}
          context="student"
          onSuccess={(newParent) => {
            console.log(newParent);
            formik.setFieldValue("parent", newParent._id);
          }}
        />
      </Modal>
    </>
  );
}

export default CreateStudentForm;
