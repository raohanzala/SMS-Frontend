import { useCallback, useState } from "react";
import { FormikProvider, useFormik, FieldArray } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/common/Button";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useAddStudent } from "@/features/students/hooks/useAddStudent";
import { useUpdateStudent } from "@/features/students/hooks/useUpdateStudent";
import { useStudent } from "@/features/students/hooks/useStudent";
import { addStudentSchema } from "@/features/students/validations/student.validation";
import ManageParentModal from "@/features/parents/components/ManageParentModal";
import ImageCropperInput from "@/components/common/ImageCropperInput";
import SearchableSelect from "@/components/common/SearchableSelect";
import RadioGroup from "@/components/common/RadioGroup";

const StudentFormPage = () => {
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const navigate = useNavigate();
  const { studentId } = useParams();
  const isEditMode = Boolean(studentId);

  const { student, isStudentLoading, studentError } = useStudent();
  const { addStudentMutation, isAddingStudent } = useAddStudent();
  const { updateStudentMutation, isUpdatingStudent } = useUpdateStudent();

  const isStudentPending = isAddingStudent || isUpdatingStudent;
  const currentYear = new Date().getFullYear();

  const sessionOptions = [];
  for (let year = 2020; year <= currentYear + 1; year++) {
    sessionOptions.push(`${year}-${year + 1}`);
  }

  const formik = useFormik({
    initialValues: {
      name: student?.name || "",
      email: student?.email || "",
      password: "",
      phone: student?.phone || "",
      address: student?.address || "",
      gender: student?.gender || "male",
      rollNumber: student?.rollNumber || "",
      classId: student?.class?._id || "",
      religion: student?.religion || "",
      session: student?.session || "",
      dob: student?.DOB || "",
      nationalId: student?.nationalId || "",
      profileImage: student?.profileImage as File | string | undefined,
      guardians:
        student?.guardians?.map((g) => ({
          parent: g.parent?._id || "",
          relation: g.relation || "Guardian",
        })) || [],
    },
    enableReinitialize: true,
    validationSchema: addStudentSchema,
    onSubmit: async (formValues) => {
      console.log(formValues);

      if (!isEditMode) {
        addStudentMutation(formValues, {
          onSuccess: () => navigate("/admin/students"),
        });
      } else if (studentId) {
        updateStudentMutation(
          { studentId, updateStudentInput: formValues },
          { onSuccess: () => navigate("/admin/students") }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  console.log(errors, values);

  const handleCancel = useCallback(() => navigate(-1), [navigate]);
  const handleParentModalClose = useCallback(
    () => setIsParentModalOpen(false),
    []
  );

  if (isEditMode && isStudentLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isEditMode && studentError) {
    return (
      <ErrorMessage
        message={studentError.message || "Failed to load student"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditMode ? "Edit Student" : "Add New Student"}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} loading={isStudentPending}>
            {isEditMode ? "Update Student" : "Create Student"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Student Information
            </h3>

            <div className="md:col-span-1 flex justify-center md:justify-start">
              <ImageCropperInput
                value={values.profileImage}
                onChange={(file) => setFieldValue("profileImage", file)}
                aspect={1}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Profile Image */}

              {/* Student Details */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical
                  label="Full Name"
                  name="name"
                  error={errors.name}
                >
                  <Input
                    {...getFieldProps("name")}
                    placeholder="Enter full name"
                  />
                </FormRowVertical>

                <FormRowVertical
                  label="Email"
                  name="email"
                  error={errors.email}
                >
                  <Input
                    {...getFieldProps("email")}
                    placeholder="Enter email"
                  />
                </FormRowVertical>

                {!isEditMode && (
                  <FormRowVertical label="Password" name="password">
                    <Input
                      {...getFieldProps("password")}
                      placeholder="Set password"
                      type="password"
                    />
                  </FormRowVertical>
                )}

                <FormRowVertical
                  label="Phone"
                  name="phone"
                  error={errors.phone}
                >
                  <Input
                    {...getFieldProps("phone")}
                    placeholder="Phone number"
                  />
                </FormRowVertical>
              </div>
            </div>
          </div>

          {/* --- Academic Information --- */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical
                label="Class"
                name="classId"
                error={errors.classId}
              >
                <EntitySelect
                  entity="class"
                  value={values.classId}
                  onChange={(classId) => setFieldValue("classId", classId)}
                  isDisabled={isStudentPending}
                />
              </FormRowVertical>
              <FormRowVertical
                label="Roll Number"
                name="rollNumber"
                error={errors.rollNumber}
              >
                <Input
                  {...getFieldProps("rollNumber")}
                  placeholder="Leave empty to auto-generate"
                />
              </FormRowVertical>
              <FormRowVertical
                label="Session"
                name="session"
                error={errors.session}
              >
                <EntitySelect
                  entity="static"
                  staticOptions={sessionOptions.map((s) => ({
                    value: s,
                    label: s,
                  }))}
                  value={values.session}
                  onChange={(session) => setFieldValue("session", session)}
                  placeholder="Select Session"
                  isDisabled={isStudentPending}
                />
              </FormRowVertical>
              <FormRowVertical label="Religion" name="religion">
                <Input
                  {...getFieldProps("religion")}
                  placeholder="Enter religion"
                />
              </FormRowVertical>
            </div>
          </div>

          {/* --- Guardians --- */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">
                Parent / Guardians
              </h3>

              <div className="flex gap-2">
                <Button onClick={() => setIsParentModalOpen(true)}>
                  + Add Parent
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setFieldValue("guardians", [
                      ...values.guardians,
                      { parent: "", relation: "" },
                    ])
                  }
                >
                  + Add Guardian
                </Button>
              </div>
            </div>

            <FieldArray
              name="guardians"
              render={(arrayHelpers) => (
                <div className="space-y-4">
                  {values.guardians.map(
                    (
                      guardian: { parent: string; relation: string },
                      index: number
                    ) => {
                      const isFatherTaken = values.guardians.some(
                        (g: { parent: string; relation: string }, i: number) =>
                          i !== index && g.relation === "Father"
                      );
                      const isMotherTaken = values.guardians.some(
                        (g: { parent: string; relation: string }, i: number) =>
                          i !== index && g.relation === "Mother"
                      );

                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 border rounded-xl shadow-sm"
                        >
                          {/* Parent Select */}
                          <FormRowVertical
                            label="Select Parent"
                            name={`guardians.${index}.parent`}
                          >
                            <EntitySelect
                              entity="parent"
                              value={guardian.parent}
                              onChange={(parentId) => {
                                // Prevent duplicate parents
                                const alreadyUsed = values.guardians.some(
                                  (
                                    g: { parent: string; relation: string },
                                    i: number
                                  ) => i !== index && g.parent === parentId
                                );

                                if (alreadyUsed) {
                                  alert("This parent is already linked.");
                                  return;
                                }

                                setFieldValue(
                                  `guardians.${index}.parent`,
                                  parentId
                                );
                              }}
                              isDisabled={isStudentPending}
                              disableOptions={(option) =>
                                values.guardians.some(
                                  (
                                    g: { parent: string; relation: string },
                                    i: number
                                  ) => i !== index && g.parent === option.value
                                )
                              }
                            />
                          </FormRowVertical>

                          {/* Relation */}
                          <div className="mt-4">
                            <FormRowVertical
                              label="Relation"
                              name={`guardians.${index}.relation`}
                            >
                              <SearchableSelect
                                value={guardian.relation}
                                onChange={(selected) => {
                                  const relation = selected;

                                  // Prevent multiple fathers
                                  if (relation === "Father" && isFatherTaken) {
                                    alert(
                                      "A student can have only one Father."
                                    );
                                    return;
                                  }

                                  // Prevent multiple mothers
                                  if (relation === "Mother" && isMotherTaken) {
                                    alert(
                                      "A student can have only one Mother."
                                    );
                                    return;
                                  }

                                  setFieldValue(
                                    `guardians.${index}.relation`,
                                    relation
                                  );
                                }}
                                fetchOptions={async (search) => {
                                  const allRelations = [
                                    {
                                      value: "Father",
                                      label: "Father",
                                      disabled: isFatherTaken,
                                    },
                                    {
                                      value: "Mother",
                                      label: "Mother",
                                      disabled: isMotherTaken,
                                    },
                                    { value: "Guardian", label: "Guardian" },
                                    { value: "Other", label: "Other" },
                                  ];

                                  // Filter by search
                                  return allRelations
                                    .filter((opt) =>
                                      opt.label
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                    )
                                    .map((opt) => ({
                                      value: opt.value,
                                      label:
                                        opt.label +
                                        (opt.disabled ? " (Not allowed)" : ""),
                                      isDisabled: opt.disabled,
                                    }));
                                }}
                                fetchById={async (value) => {
                                  if (!value) return null;

                                  return {
                                    value,
                                    label: value,
                                  };
                                }}
                                placeholder="Search relation..."
                                isClearable={false}
                                isMulti={false}
                              />
                            </FormRowVertical>
                          </div>

                          {/* Remove */}
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="danger"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove Guardian
                            </Button>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            />
          </div>

          {/* --- Other Information --- */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Other Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical
                label="Address"
                name="address"
                error={errors.address}
              >
                <Input
                  {...getFieldProps("address")}
                  placeholder="Enter address"
                />
              </FormRowVertical>
              <FormRowVertical label="National ID" name="nationalId">
                <Input {...getFieldProps("nationalId")} placeholder="CNIC" />
              </FormRowVertical>

              <FormRowVertical
                label="Gender"
                name="gender"
                error={errors.gender}
              >
                <RadioGroup
                  name="gender"
                  value={values.gender}
                  onChange={(gender) => setFieldValue("gender", gender)}
                />
              </FormRowVertical>
            </div>
          </div>

          {/* --- Form Buttons --- */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" loading={isStudentPending}>
              {isEditMode ? "Update Student" : "Create Student"}
            </Button>
          </div>
        </form>
      </FormikProvider>

      {/* Parent Modal */}
      <ManageParentModal
        parentFormContext="student"
        isManageParentModalOpen={isParentModalOpen}
        onManageParentModalClose={handleParentModalClose}
      />
    </div>
  );
};

export default StudentFormPage;
