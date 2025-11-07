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
import { Student } from "@/features/students/types/student.types";
import { AddParentInput } from "../types/parent.types";

const CreateParentForm = ({
  parentToEdit,
  onManageParentModalClose,
  onParentFormSuccess,
  parentFormContext = "parent",
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
      parentName: parentToEdit?.name || "",
      parentEmail: parentToEdit?.email || "",
      parentPhone: parentToEdit?.phone || "",
      parentAddress: parentToEdit?.address || "",
      parentGender: parentToEdit?.gender || "male",
      occupation: parentToEdit?.occupation || "",
      parentChildrenIds: parentToEdit?.children?.map((child) => child._id) || [],
    },
    validationSchema: addParentSchema,
    onSubmit: async (formValues) => {

      if (parentFormContext === "student") {
        delete (formValues as AddParentInput).parentChildrenIds;
      }

      if (!isEditMode) {
        addParentMutation(formValues, {
          onSuccess: ({ data }) => {
            onParentFormSuccess?.(data?.parent);
            onManageParentModalClose?.();
          },
        });
      } else {
        updateParentMutation(
          { parentId: parentToEdit?._id, updateParentInput: formValues },
          { onSuccess: () => onManageParentModalClose?.() }
        );
      }
    },
  });

  const { values,errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="space-y-4"
      >
        <FormRowVertical label="Full Name" name="parentName" error={errors.parentName}>
          <Input
            type="text"
            disabled={isParentLoading}
            placeholder="Enter full name"
            {...getFieldProps("parentName")}
          />
        </FormRowVertical>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Email Address" name="parentEmail" error={errors.parentEmail}>
            <Input
              type="email"
              disabled={isParentLoading}
              placeholder="Enter email (optional)"
              {...getFieldProps("parentEmail")}
            />
          </FormRowVertical>

          <FormRowVertical label="Phone" name="parentPhone" error={errors.parentPhone}>
            <Input
              type="text"
              disabled={isParentLoading}
              placeholder="Enter phone number"
              {...getFieldProps("parentPhone")}
            />
          </FormRowVertical>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Address" name="parentAddress" error={errors.parentAddress}>
            <Input
              type="text"
              disabled={isParentLoading}
              placeholder="Enter address (optional)"
              {...getFieldProps("parentAddress")}
            />
          </FormRowVertical>

          <FormRowVertical label="Occupation" name="occupation" error={errors.occupation as string}>
            <Input
              type="text"
              disabled={isParentLoading}
              placeholder="Enter occupation (optional)"
              {...getFieldProps("occupation")}
            />
          </FormRowVertical>
        </div>

        <FormRowVertical label="Gender" name="parentGender" error={errors.parentGender}>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="parentGender"
                value="male"
                checked={values.parentGender === "male"}
                onChange={() => setFieldValue("parentGender", "male")}
                disabled={isParentLoading}
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="parentGender"
                value="female"
                checked={values.parentGender === "female"}
                onChange={() => setFieldValue("parentGender", "female")}
                disabled={isParentLoading}
              />
              Female
            </label>
          </div>
        </FormRowVertical>

        {/* Children (only visible in Parent parentFormContext) */}
        {/* {parentFormContext === "parent" && (
          <FormRowVertical label="Select Children (Students)" name="children">
            <select
              id="children"
              name="children"
              multiple
              className="block w-full px-4 py-2 border rounded-lg"
              disabled={isLoading || isStudentsLoading}
              {...getFieldProps("children")}
            >
              {students?.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.rollNumber})
                </option>
              ))}
            </select>
          </FormRowVertical>
        )} */}

        {parentFormContext === "parent" && (
          <FormRowVertical label="Select Children (Students)" name="parentChildrenIds" error={errors.parentChildrenIds as string}>
            <Select
              isMulti
              isLoading={isStudentsLoading}
              options={
                students?.map((student: Student) => ({
                  value: student._id,
                  label: `${student.name} (${student.rollNumber || "N/A"})`,
                })) || []
              }
              value={
                (values.parentChildrenIds || [])
                  .map((childId) => {
                    // Try to find the student from the fetched list
                    const existingStudent = students?.find((student: Student) => student._id === childId);
                    if (existingStudent) {
                      return {
                        value: existingStudent._id,
                        label: `${existingStudent.name} (${existingStudent.rollNumber || "N/A"})`,
                      };
                    }

                    // If not found, check parentToEdit.children
                    const fallbackStudent =
                      parentToEdit?.children?.find((child) => child._id === childId);
                    if (fallbackStudent) {
                      return {
                        value: fallbackStudent._id,
                        label: fallbackStudent.name,
                      };
                    }

                    return null;
                  })
                  .filter(Boolean) // remove nulls
              }
              onChange={(selected) =>
                setFieldValue(
                  "parentChildrenIds",
                  selected ? selected.map((child) => child?.value) : []
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

        <div>
          <Button
            fullWidth
            type="submit"
            disabled={isParentLoading}
            loading={isParentLoading}
          >
            {!isEditMode ? "Add Parent" : "Edit Parent"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateParentForm;
