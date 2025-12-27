import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import EntitySelect from "@/components/common/EntitySelect";
import { CreateFeeStructureInput, UpdateFeeStructureInput, FeeStructure } from "../types/fee.types";
import { Building2, Book, DollarSign } from "lucide-react";

interface FeeStructureFormProps {
  feeStructureToEdit: FeeStructure | null;
  selectedCampusId: string | null;
  onClose: () => void;
  onSubmit: (data: CreateFeeStructureInput | UpdateFeeStructureInput) => void;
  isSubmitting: boolean;
}

const FeeStructureForm = ({
  feeStructureToEdit,
  selectedCampusId,
  onClose,
  onSubmit,
  isSubmitting,
}: FeeStructureFormProps) => {
  const isEditMode = !!feeStructureToEdit;

  const validationSchema = Yup.object({
    classId: isEditMode
      ? Yup.string()
      : Yup.string().required("Class is required"),
    monthlyFee: Yup.number()
      .required("Monthly fee is required")
      .min(0, "Monthly fee must be greater than or equal to 0"),
    admissionFee: Yup.number()
      .min(0, "Admission fee must be greater than or equal to 0"),
    examFee: Yup.number()
      .min(0, "Exam fee must be greater than or equal to 0"),
  });

  const formik = useFormik({
    initialValues: {
      classId: typeof feeStructureToEdit?.classId === "object"
        ? feeStructureToEdit.classId._id
        : feeStructureToEdit?.classId || "",
      monthlyFee: feeStructureToEdit?.monthlyFee || 0,
      admissionFee: feeStructureToEdit?.admissionFee || 0,
      examFee: feeStructureToEdit?.examFee || 0,
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEditMode) {
        const { classId, ...updateData } = values;
        onSubmit(updateData as UpdateFeeStructureInput);
      } else {
        onSubmit({
          classId: values.classId,
          monthlyFee: values.monthlyFee,
          admissionFee: values.admissionFee || 0,
          examFee: values.examFee || 0,
        } as CreateFeeStructureInput);
      }
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditMode ? "Edit Fee Structure" : "Create Fee Structure"}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {!isEditMode && (
          <FormRowVertical
            label="Class"
            name="classId"
            error={formik.errors.classId}
            required
            icon={<Book className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="class"
              value={formik.values.classId}
              onChange={(value) =>
                formik.setFieldValue("classId", Array.isArray(value) ? value[0] || "" : value || "")
              }
              placeholder="Select class"
              isDisabled={isSubmitting || isEditMode}
            />
          </FormRowVertical>
        )}

        <FormRowVertical
          label="Monthly Fee (PKR)"
          name="monthlyFee"
          error={formik.errors.monthlyFee}
          required
          icon={<DollarSign className="inline w-4 h-4" />}
        >
          <Input
            type="number"
            name="monthlyFee"
            value={formik.values.monthlyFee}
            onChange={(e) => formik.setFieldValue("monthlyFee", parseFloat(e.target.value) || 0)}
            onBlur={formik.handleBlur}
            placeholder="Enter monthly fee"
            disabled={isSubmitting}
            min="0"
            step="0.01"
          />
        </FormRowVertical>

        <FormRowVertical
          label="Admission Fee (PKR)"
          name="admissionFee"
          error={formik.errors.admissionFee}
          icon={<DollarSign className="inline w-4 h-4" />}
        >
          <Input
            type="number"
            name="admissionFee"
            value={formik.values.admissionFee}
            onChange={(e) => formik.setFieldValue("admissionFee", parseFloat(e.target.value) || 0)}
            onBlur={formik.handleBlur}
            placeholder="Enter admission fee"
            disabled={isSubmitting}
            min="0"
            step="0.01"
          />
        </FormRowVertical>

        <FormRowVertical
          label="Exam Fee (PKR)"
          name="examFee"
          error={formik.errors.examFee}
          icon={<DollarSign className="inline w-4 h-4" />}
        >
          <Input
            type="number"
            name="examFee"
            value={formik.values.examFee}
            onChange={(e) => formik.setFieldValue("examFee", parseFloat(e.target.value) || 0)}
            onBlur={formik.handleBlur}
            placeholder="Enter exam fee"
            disabled={isSubmitting}
            min="0"
            step="0.01"
          />
        </FormRowVertical>

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
            {isEditMode ? "Update Fee Structure" : "Create Fee Structure"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FeeStructureForm;

