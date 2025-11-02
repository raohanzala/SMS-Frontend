import { FormikProvider, useFormik } from "formik";
import Select from "react-select";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useUpdateParent } from "../hooks/useUpdateParent";
import { useAddParent } from "../hooks/useAddParent";
import { useStudents } from "../../students/hooks/useStudents";
import { addParentSchema } from "../validations/parent.validation";
import { CreateParentFormProps } from "../types/parent-components.interface";

const CreateParentForm = ({
  parentToEdit,
  onClose,
  onSuccess,
  context = "parent",
}: CreateParentFormProps) => {
  const isEditMode = !!parentToEdit;

  const { students, isStudentsLoading } = useStudents({
    unassigned: !isEditMode,
    parentId: isEditMode ? parentToEdit?._id : null,
  });
  const { addParentMutation, isAddingParent } = useAddParent();
  const { updateParentMutation, isUpdatingParent } = useUpdateParent();

  const isParentLoading = isAddingParent || isUpdatingParent

  const formik = useFormik({
    initialValues: {
      name: parentToEdit?.name || "",
      email: parentToEdit?.email || "",
      phone: parentToEdit?.phone || "",
      address: parentToEdit?.address || "",
      children: parentToEdit?.children || [],
    },
    validationSchema: addParentSchema,
    onSubmit: async (values) => {
      const payload = { ...values };

      if (context === "student") delete payload?.children;

      if (!isEditMode) {
        addParentMutation(payload, {
          onSuccess: ({ data }) => {
            onSuccess?.(data?.parent); // Return new parent if needed
            onClose?.();
          },
        });
      } else {
        updateParentMutation(
          { parentId: parentToEdit?._id, updateParentInput: values },
          { onSuccess: () => onClose?.() }
        );
      }
    },
  });

  return (
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
            disabled={isParentLoading}
            placeholder="Enter full name"
            {...formik.getFieldProps("name")}
          />
        </FormRowVertical>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Email Address" name="email">
            <Input
              type="email"
              disabled={isParentLoading}
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
            />
          </FormRowVertical>

          <FormRowVertical label="Phone" name="phone">
            <Input
              type="text"
              disabled={isParentLoading}
              placeholder="Enter phone number"
              {...formik.getFieldProps("phone")}
            />
          </FormRowVertical>
        </div>

        {/* Address (optional) */}
        <FormRowVertical label="Address" name="address">
          <Input
            type="text"
            disabled={isParentLoading}
            placeholder="Enter address (optional)"
            {...formik.getFieldProps("address")}
          />
        </FormRowVertical>

        {/* Children (only visible in Parent context) */}
        {/* {context === "parent" && (
          <FormRowVertical label="Select Children (Students)" name="children">
            <select
              id="children"
              name="children"
              multiple
              className="block w-full px-4 py-2 border rounded-lg"
              disabled={isLoading || isStudentsLoading}
              {...formik.getFieldProps("children")}
            >
              {students?.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.rollNumber})
                </option>
              ))}
            </select>
          </FormRowVertical>
        )} */}

        {context === "parent" && (
          <FormRowVertical label="Select Children (Students)" name="children">
            <Select
              isMulti
              isLoading={isStudentsLoading}
              options={
                students?.map((s) => ({
                  value: s._id,
                  label: `${s.name} (${s.rollNumber || "N/A"})`,
                })) || []
              }
              // ✅ Correctly handle edit mode
              value={
                (formik.values.children || [])
                  .map((childId) => {
                    // Try to find the student from the fetched list
                    const existing = students?.find((s) => s._id === childId);
                    if (existing) {
                      return {
                        value: existing._id,
                        label: `${existing.name} (${existing.rollNumber || "N/A"})`,
                      };
                    }

                    // If not found, check parentToEdit.children
                    const fallback =
                      parentToEdit?.children?.find((c) => c._id === childId);
                    if (fallback) {
                      return {
                        value: fallback._id,
                        label: fallback.name,
                      };
                    }

                    return null;
                  })
                  .filter(Boolean) // remove nulls
              }
              onChange={(selected) =>
                formik.setFieldValue(
                  "children",
                  selected ? selected.map((s) => s.value) : []
                )
              }
              placeholder="Select or search students..."
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
                  "&:hover": { borderColor: "#3b82f6" },
                  borderRadius: "0.5rem",
                  padding: "2px",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  borderRadius: "0.375rem",
                  padding: "2px 6px",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#0369a1",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#0284c7",
                  ":hover": { backgroundColor: "#bae6fd", color: "#075985" },
                }),
              }}
            />
          </FormRowVertical>
        )}


        {!isEditMode && (
          <p className="text-sm text-gray-500 italic">
            A secure password will be generated and sent to the parent
            automatically.
          </p>
        )}

        {/* Submit */}
        <div>
          <Button
            fullWidth
            type="submit"
            disabled={isParentLoading}
            loading={isAddingParent || isUpdatingParent}
          >
            {!isEditMode ? "Add Parent" : "Edit Parent"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateParentForm;
