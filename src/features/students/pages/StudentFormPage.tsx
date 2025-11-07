import { useCallback, useMemo } from "react";
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
import { AddStudentInput, UpdateStudentInput, Gender } from "@/features/students/types/student.types";

const StudentFormPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const isEditMode = Boolean(studentId);

  const { student, isStudentLoading, studentError } = useStudent();
  const { addStudentMutation, isAddingStudent } = useAddStudent();
  const { updateStudentMutation, isUpdatingStudent } = useUpdateStudent();

  const isBusy = isAddingStudent || isUpdatingStudent;

  const initialValues = useMemo(
    () => ({
      studentName: student?.name || "",
      studentEmail: student?.email || "",
      studentPassword: "", // only used on create; ignored on update
      studentPhone: student?.phone || "",
      studentAddress: student?.address || "",
      studentGender: student?.gender || "male",
      studentRollNumber: student?.rollNumber || "",
      studentClassId: student?.class?._id || "",
      studentParentId: student?.parent?._id || null,
      studentReligion: student?.religion || "",
      studentDOB: student?.DOB || "",
      studentNationalId: student?.nationalId || "",
      studentProfileImage: undefined as File | undefined,
    }),
    [student]
  );

  type FormValues = {
    studentName: string;
    studentEmail: string;
    studentPassword: string;
    studentPhone?: string;
    studentAddress?: string;
    studentGender: Gender;
    studentRollNumber?: string;
    studentClassId: string;
    studentParentId: string | null;
    studentReligion?: string;
    studentDOB?: string;
    studentNationalId?: string;
    studentProfileImage?: File | undefined;
  };

  const toErr = (e: unknown): string | undefined =>
    typeof e === "string" ? e : undefined;

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: addStudentSchema,
    onSubmit: async (formValues) => {
      const payload = { ...formValues };
      if (!isEditMode) {
        addStudentMutation(payload as unknown as AddStudentInput, {
          onSuccess: () => navigate("/admin/students"),
        });
      } else if (studentId) {
        const rest: UpdateStudentInput = {
          name: payload.studentName,
          studentPhone: payload.studentPhone,
          studentAddress: payload.studentAddress,
          studentGender: payload.studentGender,
          studentRollNumber: payload.studentRollNumber,
          studentClass: undefined,
          studentParent: payload.studentParentId ?? null,
          studentPassword: undefined,
          studentProfileImage: payload.studentProfileImage,
          studentReligion: payload.studentReligion,
          studentDOB: payload.studentDOB,
          studentNationalId: payload.studentNationalId,
        };
        updateStudentMutation(
          { studentId, updateStudentInput: rest },
          { onSuccess: () => navigate("/admin/students") }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditMode ? "Edit Student" : "Add New Student"}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => handleSubmit()} loading={isBusy}>
            {isEditMode ? "Update Student" : "Create Student"}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <FormikProvider value={formik}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="space-y-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Full Name" name="studentName" error={toErr(errors.studentName)}>
                <Input
                  type="text"
                  {...getFieldProps("studentName")}
                  placeholder="Enter full name"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Email Address" name="studentEmail" error={toErr(errors.studentEmail)}>
                <Input
                  type="email"
                  {...getFieldProps("studentEmail")}
                  placeholder="Enter email"
                  disabled={isBusy}
                />
              </FormRowVertical>

              {!isEditMode && (
                <FormRowVertical label="Password" name="studentPassword" error={undefined}>
                  <Input
                    type="password"
                    {...getFieldProps("studentPassword")}
                    placeholder="Set initial password"
                    disabled={isBusy}
                  />
                </FormRowVertical>
              )}

              <FormRowVertical label="Phone" name="studentPhone" error={toErr(errors.studentPhone)}>
                <Input
                  type="text"
                  {...getFieldProps("studentPhone")}
                  placeholder="Enter phone number"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <FormRowVertical label="Address" name="studentAddress" error={toErr(errors.studentAddress)}>
              <Input
                type="text"
                {...getFieldProps("studentAddress")}
                placeholder="Enter address"
                disabled={isBusy}
              />
            </FormRowVertical>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormRowVertical label="Gender" name="studentGender" error={toErr(errors.studentGender)}>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="studentGender"
                      value="male"
                      checked={values.studentGender === "male"}
                      onChange={() => setFieldValue("studentGender", "male")}
                      disabled={isBusy}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="studentGender"
                      value="female"
                      checked={values.studentGender === "female"}
                      onChange={() => setFieldValue("studentGender", "female")}
                      disabled={isBusy}
                    />
                    Female
                  </label>
                </div>
              </FormRowVertical>

              <FormRowVertical label="Date of Birth" name="studentDOB" error={undefined}>
                <Input
                  type="date"
                  value={values.studentDOB || ""}
                  onChange={(e) => setFieldValue("studentDOB", e.target.value)}
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="National ID" name="studentNationalId" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("studentNationalId")}
                  placeholder="e.g., CNIC"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Class" name="studentClassId" error={toErr(errors.studentClassId)}>
                <EntitySelect
                  entity="class"
                  value={values.studentClassId}
                  onChange={(classId) => setFieldValue("studentClassId", classId)}
                />
              </FormRowVertical>

              <FormRowVertical label="Roll Number" name="studentRollNumber" error={toErr(errors.studentRollNumber)}>
                <Input
                  type="text"
                  {...getFieldProps("studentRollNumber")}
                  placeholder="Leave empty to auto-generate"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Parent" name="studentParentId" error={toErr(errors.studentParentId)}>
                <EntitySelect
                  entity="parent"
                  value={values.studentParentId}
                  onChange={(parentId) => setFieldValue("studentParentId", parentId)}
                />
              </FormRowVertical>

              <FormRowVertical label="Religion" name="studentReligion" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("studentReligion")}
                  placeholder="Enter religion"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <FormRowVertical label="Profile Image" name="studentProfileImage" error={undefined}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFieldValue("studentProfileImage", file);
                }}
                disabled={isBusy}
              />
            </FormRowVertical>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" type="button" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" loading={isBusy}>
                {isEditMode ? "Update Student" : "Create Student"}
              </Button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default StudentFormPage;


