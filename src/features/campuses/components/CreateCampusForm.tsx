import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { CreateCampusInput, UpdateCampusInput, Campus } from "../types/campus.types";

interface CreateCampusFormProps {
  campusToEdit: Campus | null;
  onClose: () => void;
  onSubmit: (data: CreateCampusInput | UpdateCampusInput) => void;
  isSubmitting: boolean;
}

const CreateCampusForm = ({
  campusToEdit,
  onClose,
  onSubmit,
  isSubmitting,
}: CreateCampusFormProps) => {
  const isEditMode = !!campusToEdit;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Campus name is required")
      .min(2, "Campus name must be at least 2 characters"),
    code: isEditMode
      ? Yup.string()
      : Yup.string()
          .required("Campus code is required")
          .min(2, "Campus code must be at least 2 characters")
          .matches(/^[A-Z0-9-]+$/, "Code must contain only uppercase letters, numbers, and hyphens"),
    address: Yup.string(),
    phone: Yup.string().matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Invalid phone number"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: campusToEdit?.name || "",
      code: campusToEdit?.code || "",
      address: campusToEdit?.address || "",
      phone: campusToEdit?.phone || "",
      isActive: campusToEdit?.isActive ?? true,
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEditMode) {
        const { code, ...updateData } = values;
        onSubmit(updateData as UpdateCampusInput);
      } else {
        onSubmit({
          name: values.name,
          code: values.code.toUpperCase().trim(),
          address: values.address,
          phone: values.phone,
        } as CreateCampusInput);
      }
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditMode ? "Edit Campus" : "Add New Campus"}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormRowVertical
          label="Campus Name"
          name="name"
          error={formik.errors.name}
          required
        >
          <Input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter campus name"
            disabled={isSubmitting}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Campus Code"
          name="code"
          error={formik.errors.code}
          required={!isEditMode}
          helperText={isEditMode ? "Code cannot be changed" : "e.g., ABC-NORTH (will be converted to uppercase)"}
        >
          <Input
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter campus code"
            disabled={isSubmitting || isEditMode}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Address"
          name="address"
          error={formik.errors.address}
        >
          <Input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter campus address"
            disabled={isSubmitting}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Phone"
          name="phone"
          error={formik.errors.phone}
        >
          <Input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter phone number"
            disabled={isSubmitting}
          />
        </FormRowVertical>

        {isEditMode && (
          <FormRowVertical
            label="Status"
            name="isActive"
            error={formik.errors.isActive as string | undefined}
          >
            <select
              name="isActive"
              value={formik.values.isActive ? "true" : "false"}
              onChange={(e) => formik.setFieldValue("isActive", e.target.value === "true")}
              disabled={isSubmitting}
              className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </FormRowVertical>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isEditMode ? "Update Campus" : "Create Campus"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCampusForm;

