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
      occupation: parentToEdit?.occupation || "",
      income: parentToEdit?.income || "",
      nationalId: parentToEdit?.nationalId || "",
      childrenIds: parentToEdit?.children?.map((c) => c._id) || [],
    },
    validationSchema: addParentSchema,
    onSubmit: async (values) => {
      console.log(values);
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
        <FormRowVertical label="Full Name" name="name" error={errors.name}>
          <Input
            type="text"
            placeholder="Enter full name"
            disabled={isParentLoading}
            {...getFieldProps("name")}
          />
        </FormRowVertical>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRowVertical label="Email" name="email" error={errors.email}>
            <Input
              type="email"
              placeholder="Enter email"
              disabled={isParentLoading}
              {...getFieldProps("email")}
            />
          </FormRowVertical>

          <FormRowVertical label="Phone" name="phone" error={errors.phone}>
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
            label="Occupation"
            name="occupation"
            error={errors.occupation}
          >
            <Input
              type="text"
              placeholder="Enter occupation"
              disabled={isParentLoading}
              {...getFieldProps("occupation")}
            />
          </FormRowVertical>

          <FormRowVertical label="Income" name="income" error={errors.income}>
            <Input
              type="number"
              placeholder="Enter income"
              disabled={isParentLoading}
              {...getFieldProps("income")}
            />
          </FormRowVertical>
        </div>

        <FormRowVertical
          label="National ID (CNIC)"
          name="nationalId"
          error={errors.nationalId}
        >
          <Input
            type="text"
            placeholder="Enter CNIC"
            disabled={isParentLoading}
            {...getFieldProps("nationalId")}
          />
        </FormRowVertical>

        {parentFormContext === "parent" && (
          <FormRowVertical
            label="Children (Students)"
            name="childrenIds"
            error={errors.childrenIds}
          >
            <EntitySelect
              entity="student"
              isMulti={true}
              value={values.childrenIds || []}
              onChange={(ids) => setFieldValue("childrenIds", ids)}
            />
          </FormRowVertical>
        )}

        {!isEditMode && (
          <p className="text-sm text-gray-500 italic">
            A secure password will be generated & emailed automatically.
          </p>
        )}

        <Button
          fullWidth
          type="submit"
          disabled={isParentLoading}
          loading={isParentLoading}
        >
          {isEditMode ? "Update Parent" : "Add Parent"}
        </Button>
      </form>
    </FormikProvider>
  );
};

export default CreateParentForm;
