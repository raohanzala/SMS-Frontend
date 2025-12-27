import { useFormik } from "formik";
import * as Yup from "yup";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import EntitySelect from "@/components/common/EntitySelect";
import { CreateCertificateInput } from "../types/certificate.types";
import { Award, User } from "lucide-react";

interface CertificateFormProps {
  onClose: () => void;
  onSubmit: (data: CreateCertificateInput) => void;
  isSubmitting: boolean;
}

const CertificateForm = ({
  onClose,
  onSubmit,
  isSubmitting,
}: CertificateFormProps) => {
  const validationSchema = Yup.object({
    studentId: Yup.string().required("Student is required"),
    type: Yup.string()
      .required("Certificate type is required")
      .oneOf(["LEAVING", "BONAFIDE", "CHARACTER"], "Invalid certificate type"),
  });

  const formik = useFormik({
    initialValues: {
      studentId: "",
      type: "" as "LEAVING" | "BONAFIDE" | "CHARACTER" | "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        studentId: values.studentId,
        type: values.type as "LEAVING" | "BONAFIDE" | "CHARACTER",
      });
    },
  });

  const certificateTypes = [
    { value: "LEAVING", label: "Leaving Certificate" },
    { value: "BONAFIDE", label: "Bonafide Certificate" },
    { value: "CHARACTER", label: "Character Certificate" },
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Issue Certificate"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormRowVertical
          label="Student"
          name="studentId"
          error={formik.errors.studentId}
          required
          icon={<User className="inline w-4 h-4" />}
        >
          <EntitySelect
            entity="student"
            value={formik.values.studentId}
            onChange={(value) =>
              formik.setFieldValue("studentId", Array.isArray(value) ? value[0] || "" : value || "")
            }
            placeholder="Search and select student"
            isDisabled={isSubmitting}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Certificate Type"
          name="type"
          error={formik.errors.type}
          required
          icon={<Award className="inline w-4 h-4" />}
        >
          <select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Select certificate type</option>
            {certificateTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
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
            Issue Certificate
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CertificateForm;

