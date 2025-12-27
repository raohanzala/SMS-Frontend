import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import EntitySelect from "@/components/common/EntitySelect";
import { CreateExamInput, UpdateExamInput, Exam } from "../types/exam.types";
import { Calendar, BookOpen } from "lucide-react";

interface ExamFormProps {
  examToEdit: Exam | null;
  selectedSessionId: string | null;
  onClose: () => void;
  onSubmit: (data: CreateExamInput | UpdateExamInput) => void;
  isSubmitting: boolean;
}

const ExamForm = ({
  examToEdit,
  selectedSessionId,
  onClose,
  onSubmit,
  isSubmitting,
}: ExamFormProps) => {
  const isEditMode = !!examToEdit;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Exam name is required")
      .min(2, "Exam name must be at least 2 characters"),
    sessionId: isEditMode
      ? Yup.string()
      : Yup.string().required("Session is required"),
    startDate: Yup.string().nullable(),
    endDate: Yup.string()
      .nullable()
      .test("endDate", "End date must be after start date", function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return new Date(value) >= new Date(startDate);
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: examToEdit?.name || "",
      sessionId: typeof examToEdit?.sessionId === "object"
        ? examToEdit.sessionId._id
        : examToEdit?.sessionId || selectedSessionId || "",
      startDate: examToEdit?.startDate
        ? new Date(examToEdit.startDate).toISOString().split("T")[0]
        : "",
      endDate: examToEdit?.endDate
        ? new Date(examToEdit.endDate).toISOString().split("T")[0]
        : "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        name: values.name,
        sessionId: values.sessionId,
        startDate: values.startDate || null,
        endDate: values.endDate || null,
      } as CreateExamInput | UpdateExamInput);
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditMode ? "Edit Exam" : "Create Exam"}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormRowVertical
          label="Exam Name"
          name="name"
          error={formik.errors.name}
          required
          icon={<BookOpen className="inline w-4 h-4" />}
        >
          <Input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g., Mid Term, Final Exam"
            disabled={isSubmitting}
          />
        </FormRowVertical>

        {!isEditMode && (
          <FormRowVertical
            label="Session"
            name="sessionId"
            error={formik.errors.sessionId}
            required
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="session"
              value={formik.values.sessionId}
              onChange={(value) =>
                formik.setFieldValue("sessionId", Array.isArray(value) ? value[0] || "" : value || "")
              }
              placeholder="Select session"
              isDisabled={isSubmitting}
            />
          </FormRowVertical>
        )}

        <FormRowVertical
          label="Start Date"
          name="startDate"
          error={formik.errors.startDate}
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <Input
            type="date"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
          />
        </FormRowVertical>

        <FormRowVertical
          label="End Date"
          name="endDate"
          error={formik.errors.endDate}
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <Input
            type="date"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min={formik.values.startDate || undefined}
            disabled={isSubmitting}
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
            {isEditMode ? "Update Exam" : "Create Exam"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExamForm;

