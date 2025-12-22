import { useCallback, useState } from "react";
import { FormikProvider, useFormik, FieldArray } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAddStudent } from "@/features/students/hooks/useAddStudent";
import { useUpdateStudent } from "@/features/students/hooks/useUpdateStudent";
import { useStudent } from "@/features/students/hooks/useStudent";
import { addStudentSchema } from "@/features/students/validations/student.validation";
import Button from "@/components/common/Button";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import ManageParentModal from "@/features/parents/components/ManageParentModal";
import ImageCropperInput from "@/components/common/ImageCropperInput";
import SearchableSelect from "@/components/common/SearchableSelect";
import RadioGroup from "@/components/common/RadioGroup";
import Card from "@/components/common/Card";

const StudentFormPage = () => {
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const navigate = useNavigate();
  const { studentId } = useParams();
  const isEditMode = Boolean(studentId);

  const { student, isStudentLoading, studentError } = useStudent();
  const { addStudentMutation, isAddingStudent } = useAddStudent();
  const { updateStudentMutation, isUpdatingStudent } = useUpdateStudent();

  const isStudentPending = isAddingStudent || isUpdatingStudent;

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
        student?.guardians?.map(
          (g: { parent?: { _id: string }; relation?: string }) => ({
            parent: g.parent?._id || "",
            relation: g.relation || "Guardian",
          })
        ) || [],
    },
    enableReinitialize: true,
    validationSchema: addStudentSchema,
    onSubmit: async (formValues) => {
      // Transform profileImage - if it's a string (URL), don't include it in update
      const { profileImage, ...restValues } = formValues;
      const apiPayload = {
        ...restValues,
        ...(typeof profileImage !== "string" && profileImage
          ? { profileImage }
          : {}),
      };

      if (!isEditMode) {
        addStudentMutation(
          apiPayload as Parameters<typeof addStudentMutation>[0],
          {
            onSuccess: () => navigate("/admin/students"),
          }
        );
      } else if (studentId) {
        updateStudentMutation(
          { studentId, updateStudentInput: apiPayload },
          { onSuccess: () => navigate("/admin/students") }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

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
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">
            {isEditMode ? "Edit Student" : "Add New Student"}
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            {isEditMode
              ? "Update student information and academic details"
              : "Fill in the details to create a new student profile"}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={handleCancel}
            disabled={isStudentPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isStudentPending}
            disabled={isStudentPending}
          >
            {isEditMode ? "Update Student" : "Create Student"}
          </Button>
        </div>
      </div>

      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-8"
        >
          <Card
            title="Student Information"
            description="Basic details and profile information"
          >
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Profile Image */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <ImageCropperInput
                      value={values.profileImage}
                      onChange={(file) => setFieldValue("profileImage", file)}
                      aspect={1}
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormRowVertical
                    label="Full Name"
                    name="name"
                    error={errors.name}
                    required
                  >
                    <Input
                      {...getFieldProps("name")}
                      placeholder="Enter full name"
                      disabled={isStudentPending}
                    />
                  </FormRowVertical>

                  <FormRowVertical
                    label="Email"
                    name="email"
                    error={errors.email}
                    required
                  >
                    <Input
                      {...getFieldProps("email")}
                      placeholder="Enter email"
                      disabled={isStudentPending}
                    />
                  </FormRowVertical>

                  {!isEditMode && (
                    <FormRowVertical
                      label="Password"
                      name="password"
                      error={errors.password}
                      required
                    >
                      <Input
                        {...getFieldProps("password")}
                        placeholder="Set password"
                        type="password"
                        disabled={isStudentPending}
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
                      placeholder="Enter phone number"
                      disabled={isStudentPending}
                    />
                  </FormRowVertical>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="Academic Information"
            description="Class, session, and enrollment details"
          >
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormRowVertical
                  label="Class"
                  name="classId"
                  error={errors.classId}
                  required
                >
                  <EntitySelect
                    entity="class"
                    value={values.classId}
                    onChange={(value: string | string[] | null) => {
                      const classId = Array.isArray(value) ? value[0] : value;
                      setFieldValue("classId", classId || "");
                    }}
                    isDisabled={isStudentPending}
                  />
                </FormRowVertical>
                <FormRowVertical
                  label="Roll Number"
                  name="rollNumber"
                  error={errors.rollNumber}
                  helperText="Leave empty to auto-generate"
                >
                  <Input
                    {...getFieldProps("rollNumber")}
                    placeholder="Leave empty to auto-generate"
                    disabled={isStudentPending}
                  />
                </FormRowVertical>
                <FormRowVertical
                  label="Session"
                  name="session"
                  error={errors.session}
                >
                  <EntitySelect
                    entity="session"
                    value={values.session}
                    onChange={(value: string | string[] | null) => {
                      const session = Array.isArray(value) ? value[0] : value;
                      setFieldValue("session", session || "");
                    }}
                    placeholder="Select Session"
                    isDisabled={isStudentPending}
                  />
                </FormRowVertical>
                <FormRowVertical
                  label="Religion"
                  name="religion"
                  error={errors.religion}
                >
                  <Input
                    {...getFieldProps("religion")}
                    placeholder="Enter religion"
                    disabled={isStudentPending}
                  />
                </FormRowVertical>
              </div>
            </div>
          </Card>

          <Card
            title="Parent / Guardians"
            description="Link parents or guardians to this student"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsParentModalOpen(true)}
                  disabled={isStudentPending}
                >
                  + Add Parent
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFieldValue("guardians", [
                      ...values.guardians,
                      { parent: "", relation: "" },
                    ])
                  }
                  disabled={isStudentPending}
                >
                  + Add Guardian
                </Button>
              </div>
            </div>

            <div className="px-8 pb-8">
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
                          (
                            g: { parent: string; relation: string },
                            i: number
                          ) => i !== index && g.relation === "Father"
                        );
                        const isMotherTaken = values.guardians.some(
                          (
                            g: { parent: string; relation: string },
                            i: number
                          ) => i !== index && g.relation === "Mother"
                        );

                        return (
                          <div
                            key={index}
                            className="p-6 bg-bg-secondary border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                          >
                            {/* Parent Select */}
                            <FormRowVertical
                              label="Select Parent"
                              name={`guardians.${index}.parent`}
                            >
                              <EntitySelect
                                entity="parent"
                                value={guardian.parent}
                                onChange={(value: string | string[] | null) => {
                                  const parentId = Array.isArray(value)
                                    ? value[0]
                                    : value;
                                  if (!parentId) return;

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
                                    if (
                                      relation === "Father" &&
                                      isFatherTaken
                                    ) {
                                      alert(
                                        "A student can have only one Father."
                                      );
                                      return;
                                    }

                                    // Prevent multiple mothers
                                    if (
                                      relation === "Mother" &&
                                      isMotherTaken
                                    ) {
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
                                          (opt.disabled
                                            ? " (Not allowed)"
                                            : ""),
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
                                type="button"
                                variant="danger"
                                onClick={() => arrayHelpers.remove(index)}
                                disabled={isStudentPending}
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
          </Card>

          <Card
            title="Other Information"
            description="Additional personal details"
          >
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormRowVertical
                  label="Address"
                  name="address"
                  error={errors.address}
                >
                  <Input
                    {...getFieldProps("address")}
                    placeholder="Enter address"
                    disabled={isStudentPending}
                  />
                </FormRowVertical>
                <FormRowVertical
                  label="National ID"
                  name="nationalId"
                  error={errors.nationalId}
                >
                  <Input
                    {...getFieldProps("nationalId")}
                    placeholder="Enter CNIC"
                    disabled={isStudentPending}
                  />
                </FormRowVertical>

                <FormRowVertical
                  label="Gender"
                  name="gender"
                  error={errors.gender}
                  required
                >
                  <RadioGroup
                    name="gender"
                    value={values.gender}
                    onChange={(gender) => setFieldValue("gender", gender)}
                  />
                </FormRowVertical>

                <FormRowVertical
                  label="Date of Birth"
                  name="dob"
                  error={errors.dob}
                >
                  <Input
                    {...getFieldProps("dob")}
                    type="date"
                    placeholder="Select date of birth"
                    disabled={isStudentPending}
                  />
                </FormRowVertical>
              </div>
            </div>
          </Card>
        </form>
      </FormikProvider>

      <ManageParentModal
        parentFormContext="student"
        isManageParentModalOpen={isParentModalOpen}
        onManageParentModalClose={handleParentModalClose}
      />
    </div>
  );
};

export default StudentFormPage;
