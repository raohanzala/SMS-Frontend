import { useCallback, useState } from "react";
import { FormikProvider, useFormik } from "formik";
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
      parentId: student?.parent?._id || null,
      religion: student?.religion || "",
      session: student?.session || "",
      dob: student?.DOB || "",
      nationalId: student?.nationalId || "",
      profileImage: undefined as File | undefined,
    },
    enableReinitialize: true,
    validationSchema: addStudentSchema,
    onSubmit: async (formValues) => {
      if (!isEditMode) {
        addStudentMutation(formValues, {
          onSuccess: () => navigate("/admin/students"),
        });
      }
      if (studentId) {
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

      {/* Form Wrapper */}
      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {/* --- Section: Student Information --- */}
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
                  type="text"
                  {...getFieldProps("name")}
                  placeholder="Enter full name"
                />
              </FormRowVertical>

              <FormRowVertical label="Email" name="email" error={errors.email}>
                <Input
                  type="email"
                  {...getFieldProps("email")}
                  placeholder="Enter email"
                />
              </FormRowVertical>

              {!isEditMode && (
                <FormRowVertical label="Password" name="password">
                  <Input
                    type="password"
                    {...getFieldProps("password")}
                    placeholder="Set password"
                  />
                </FormRowVertical>
              )}

              <FormRowVertical label="Phone" name="phone" error={errors.phone}>
                <Input
                  type="text"
                  {...getFieldProps("phone")}
                  placeholder="Phone number"
                />
              </FormRowVertical>

              <FormRowVertical
                label="Date of Birth"
                name="dob"
                error={errors.dob}
              >
                <Input
                  type="date"
                  value={values.dob || ""}
                  onChange={(e) => setFieldValue("dob", e.target.value)}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Gender"
                name="gender"
                error={errors.gender}
              >
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={() => setFieldValue("gender", "male")}
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
                    />
                    Female
                  </label>
                </div>
              </FormRowVertical>
            </div>
          </div>

          {/* --- Section: Academic Information --- */}
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
                  type="text"
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
                  className="w-full mt-1 px-4 py-3 border rounded-md"
                  {...getFieldProps("session")}
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
                  type="text"
                  {...getFieldProps("religion")}
                  placeholder="Enter religion"
                />
              </FormRowVertical>
            </div>
          </div>

          {/* --- Section: Parent Information --- */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Parent Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-[3fr_1fr] gap-4 items-center">
                <FormRowVertical
                  label="Parent"
                  name="parentId"
                  error={errors.parentId}
                >
                  <EntitySelect
                    entity="parent"
                    value={values.parentId}
                    onChange={(parentId) => setFieldValue("parentId", parentId)}
                  />
                </FormRowVertical>
                <Button onClick={() => setIsParentModalOpen(true)}>
                  Add Parent
                </Button>
              </div>
            </div>
          </div>

          {/* --- Section: Other Information --- */}
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
                  type="text"
                  {...getFieldProps("address")}
                  placeholder="Enter address"
                />
              </FormRowVertical>

              <FormRowVertical label="National ID" name="nationalId">
                <Input
                  type="text"
                  {...getFieldProps("nationalId")}
                  placeholder="CNIC"
                />
              </FormRowVertical>

              {/* Profile Image */}
              <FormRowVertical label="Profile Image" name="profileImage">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {values.profileImage ? (
                      typeof values.profileImage === "string" ? (
                        <img
                          src={values.profileImage}
                          alt="Profile"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(values.profileImage)}
                          alt="Profile Preview"
                          className="object-cover w-full h-full"
                        />
                      )
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFieldValue("profileImage", file);
                    }}
                  />
                </div>
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
