import { FormikProvider, useFormik } from "formik";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useUpdateParent } from "../hooks/useUpdateParent";
import { useAddParent } from "../hooks/useAddParent";
import { addParentSchema } from "../validations/parent.validation";
import { CreateParentFormProps } from "../types/parent-components.interface";
import { AddParentInput } from "../types/parent.types";
import EntitySelect from "@/components/common/EntitySelect";

const CreateParentForm = ({
  parentToEdit,
  onManageParentModalClose,
  onParentFormSuccess,
  parentFormContext = "parent",
}: CreateParentFormProps) => {
  const isEditMode = !!parentToEdit;

  const { addParentMutation, isAddingParent } = useAddParent();
  const { updateParentMutation, isUpdatingParent } = useUpdateParent();

  const isParentLoading = isAddingParent || isUpdatingParent;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: parentToEdit?.name || "",
      email: parentToEdit?.email || "",
      phone: parentToEdit?.phone || "",
      address: parentToEdit?.address || "",
      gender: parentToEdit?.gender || "male",
      occupation: parentToEdit?.occupation || "",
      childrenIds: parentToEdit?.children?.map((c) => c._id) || [],
    },
    validationSchema: addParentSchema,
    onSubmit: async (values) => {
      const payload: AddParentInput = { ...values };

      if (parentFormContext === "student") {
        delete payload.childrenIds;
      }

      if (!isEditMode) {
        addParentMutation(payload, {
          onSuccess: ({ data }) => {
            onParentFormSuccess?.(data?.parent);
            onManageParentModalClose?.();
          },
        });
      } else if (parentToEdit?._id) {
        updateParentMutation(
          { parentId: parentToEdit._id, updateParentInput: payload },
          { onSuccess: () => onManageParentModalClose?.() }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <FormRowVertical
          label="Full Name"
          name="name"
          error={errors.name as string | undefined}
        >
          <Input
            type="text"
            placeholder="Enter full name"
            disabled={isParentLoading}
            {...getFieldProps("name")}
          />
        </FormRowVertical>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical
            label="Email Address"
            name="email"
            error={errors.email as string | undefined}
          >
            <Input
              type="email"
              placeholder="Enter email (optional)"
              disabled={isParentLoading}
              {...getFieldProps("email")}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Phone"
            name="phone"
            error={errors.phone as string | undefined}
          >
            <Input
              type="text"
              placeholder="Enter phone number"
              disabled={isParentLoading}
              {...getFieldProps("phone")}
            />
          </FormRowVertical>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical
            label="Address"
            name="address"
            error={errors.address as string | undefined}
          >
            <Input
              type="text"
              placeholder="Enter address (optional)"
              disabled={isParentLoading}
              {...getFieldProps("address")}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Occupation"
            name="occupation"
            error={errors.occupation as string | undefined}
          >
            <Input
              type="text"
              placeholder="Enter occupation (optional)"
              disabled={isParentLoading}
              {...getFieldProps("occupation")}
            />
          </FormRowVertical>
        </div>

        <FormRowVertical
          label="Gender"
          name="gender"
          error={errors.gender as string | undefined}
        >
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={values.gender === "male"}
                onChange={() => setFieldValue("gender", "male")}
                disabled={isParentLoading}
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
                disabled={isParentLoading}
              />
              Female
            </label>
          </div>
        </FormRowVertical>

        {parentFormContext === "parent" && (
          <FormRowVertical
            label="Select Children (Students)"
            name="childrenIds"
            error={errors.childrenIds as string | undefined}
          >
            <EntitySelect
              entity="student"
              value={values.childrenIds}
              onChange={(childrenIds) =>
                setFieldValue("childrenIds", childrenIds)
              }
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
};

export default CreateParentForm;
