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

const guardianRelations = ["Father", "Mother", "Guardian"];

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
      profileImage: undefined as File | string | undefined,
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
          {/* --- Student Information --- */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FormRowVertical label="Email" name="email" error={errors.email}>
                <Input {...getFieldProps("email")} placeholder="Enter email" />
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
              <FormRowVertical label="Phone" name="phone" error={errors.phone}>
                <Input {...getFieldProps("phone")} placeholder="Phone number" />
              </FormRowVertical>
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
                <select
                  {...getFieldProps("session")}
                  className="w-full mt-1 px-4 py-3 border rounded-md"
                >
                  <option value="">Select session</option>
                  {sessionOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
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
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Guardians
            </h3>
            <FieldArray
              name="guardians"
              render={(arrayHelpers) => (
                <div className="space-y-4">
                  {values.guardians.map((guardian, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                    >
                      <FormRowVertical
                        label="Parent"
                        name={`guardians.${index}.parent`}
                      >
                        <EntitySelect
                          entity="parent"
                          value={guardian.parent}
                          onChange={(parentId) =>
                            setFieldValue(`guardians.${index}.parent`, parentId)
                          }
                        />
                      </FormRowVertical>
                      <FormRowVertical
                        label="Relation"
                        name={`guardians.${index}.relation`}
                      >
                        <select
                          value={guardian.relation}
                          onChange={(e) =>
                            setFieldValue(
                              `guardians.${index}.relation`,
                              e.target.value
                            )
                          }
                          className="w-full mt-1 px-4 py-3 border rounded-md"
                        >
                          {guardianRelations.map((rel) => (
                            <option key={rel} value={rel}>
                              {rel}
                            </option>
                          ))}
                        </select>
                      </FormRowVertical>
                      <Button
                        variant="destructive"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({ parent: "", relation: "Guardian" })
                    }
                  >
                    Add Guardian
                  </Button>
                  <Button onClick={() => setIsParentModalOpen(true)}>
                    Add Parent
                  </Button>
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
                label="Profile Image"
                name="profileImage"
                error={errors.profileImage}
              >
                <ImageCropperInput
                  value={values.profileImage}
                  onChange={(file) => setFieldValue("profileImage", file)}
                  aspect={1}
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
