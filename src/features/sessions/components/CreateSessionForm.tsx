import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAddSession } from "../hooks/useAddSession";
import { useUpdateSession } from "../hooks/useUpdateSession";
import { CreateSessionFormProps } from "../types/session-components.types";
import { addSessionSchema } from "../validation/session.validation";

const CreateSessionForm = ({ sessionToEdit, onClose }: CreateSessionFormProps) => {
  const { addSessionMutation, isAddingSession } = useAddSession();
  const { updateSessionMutation, isUpdatingSession } = useUpdateSession();

  const isEditMode = !!sessionToEdit;
  const isSessionLoading = isAddingSession || isUpdatingSession;

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const formik = useFormik({
    initialValues: {
      name: sessionToEdit?.name || "",
      startDate: formatDateForInput(sessionToEdit?.startDate),
      endDate: formatDateForInput(sessionToEdit?.endDate),
      isActive: sessionToEdit?.isActive ?? false,
    },
    validationSchema: addSessionSchema,
    onSubmit: async (formValues) => {
      if (!isEditMode) {
        addSessionMutation(
          { addSessionInput: formValues },
          {
            onSuccess: () => onClose?.(),
          }
        );
      } else {
        if (sessionToEdit?._id) {
          updateSessionMutation(
            { sessionId: sessionToEdit._id, updateSessionInput: formValues },
            {
              onSuccess: () => onClose?.(),
            }
          );
        }
      }
    },
  });

  const { errors, values, setFieldValue, getFieldProps, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        {/* Session Name */}
        <FormRowVertical label="Session Name" name="name" error={errors.name}>
          <Input
            type="text"
            placeholder="e.g., Academic Year 2024-2025"
            disabled={isSessionLoading}
            {...getFieldProps("name")}
          />
        </FormRowVertical>

        {/* Start Date */}
        <FormRowVertical label="Start Date" name="startDate" error={errors.startDate}>
          <Input
            type="date"
            disabled={isSessionLoading}
            {...getFieldProps("startDate")}
          />
        </FormRowVertical>

        {/* End Date */}
        <FormRowVertical label="End Date" name="endDate" error={errors.endDate}>
          <Input
            type="date"
            disabled={isSessionLoading}
            {...getFieldProps("endDate")}
          />
        </FormRowVertical>

        {/* Is Active */}
        <FormRowVertical label="Set as Active Session" name="isActive" error={errors.isActive}>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={values.isActive}
              onChange={(e) => setFieldValue("isActive", e.target.checked)}
              disabled={isSessionLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Mark this session as active
            </label>
          </div>
        </FormRowVertical>

        {/* Submit Button */}
        <div className="mt-5">
          <Button fullWidth={true} type="submit" loading={isSessionLoading}>
            {!isEditMode ? "Add Session" : "Update Session"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateSessionForm;

