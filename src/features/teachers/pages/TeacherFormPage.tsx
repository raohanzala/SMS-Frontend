import { useCallback, useMemo } from "react";
import { FormikProvider, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/common/Button";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useAddTeacher } from "@/features/teachers/hooks/useAddTeacher";
import { useUpdateTeacher } from "@/features/teachers/hooks/useUpdateTeacher";
import { useTeacher } from "@/features/teachers/hooks/useTeacher";
import { addTeacherSchema } from "@/features/teachers/validations/teacher.validation";
import { useClasses } from "@/features/classes/hooks/useClasses";

const TeacherFormPage = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const isEditMode = Boolean(teacherId);

  const { teacher, isTeacherLoading, teacherError } = useTeacher(teacherId);
  const { addTeacherMutation, isAddingTeacher } = useAddTeacher();
  const { updateTeacherMutation, isUpdatingTeacher } = useUpdateTeacher();
  const { classes } = useClasses();

  const isBusy = isAddingTeacher || isUpdatingTeacher;

  const initialValues = useMemo(
    () => ({
      teacherName: teacher?.name || "",
      teacherEmail: teacher?.email || "",
      teacherPhone: teacher?.phone || "",
      teacherAddress: teacher?.address || "",
      teacherGender: teacher?.gender || "male" as "male" | "female",
      teacherExperience: teacher?.experience || "",
      teacherEducation: teacher?.education || "",
      teacherHusband: teacher?.husband || "",
      teacherDateOfJoining: teacher?.dateOfJoining || "",
      assignedClasses: Array.isArray(teacher?.assignedClasses)
        ? teacher.assignedClasses.map((cls: { _id?: string } | string) => typeof cls === "string" ? cls : cls._id || "")
        : [],
      teacherSalary: teacher?.salary || { amount: 0, currency: "PKR" },
      teacherProfileImage: undefined as File | undefined,
    }),
    [teacher]
  );

  type FormValues = {
    teacherName: string;
    teacherEmail: string;
    teacherPhone?: string;
    teacherAddress?: string;
    teacherGender: "male" | "female";
    teacherExperience?: string;
    teacherEducation?: string;
    teacherHusband?: string;
    teacherDateOfJoining?: string;
    assignedClasses?: string[];
    teacherSalary?: { amount: number; currency: string };
    teacherProfileImage?: File | undefined;
  };

  const toErr = (e: unknown): string | undefined =>
    typeof e === "string" ? e : undefined;

  const currencyOptions = [
    { value: "PKR", label: "PKR" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: addTeacherSchema,
    onSubmit: async (formValues) => {
      const formData = new FormData();
      
      // Append all fields to FormData
      formData.append("teacherName", formValues.teacherName);
      formData.append("teacherEmail", formValues.teacherEmail);
      if (formValues.teacherPhone) formData.append("teacherPhone", formValues.teacherPhone);
      if (formValues.teacherAddress) formData.append("teacherAddress", formValues.teacherAddress);
      formData.append("teacherGender", formValues.teacherGender);
      if (formValues.teacherExperience) formData.append("teacherExperience", formValues.teacherExperience);
      if (formValues.teacherEducation) formData.append("teacherEducation", formValues.teacherEducation);
      if (formValues.teacherHusband) formData.append("teacherHusband", formValues.teacherHusband);
      if (formValues.teacherDateOfJoining) formData.append("teacherDateOfJoining", formValues.teacherDateOfJoining);
      
      if (formValues.assignedClasses && formValues.assignedClasses.length > 0) {
        formValues.assignedClasses.forEach((classId) => {
          formData.append("assignedClasses[]", classId);
        });
      }
      
      if (formValues.teacherSalary) {
        formData.append("teacherSalary", JSON.stringify(formValues.teacherSalary));
      }
      
      if (formValues.teacherProfileImage) {
        formData.append("profileImage", formValues.teacherProfileImage);
      }

      if (!isEditMode) {
        addTeacherMutation(formData, {
          onSuccess: () => navigate("/admin/teachers"),
        });
      } else if (teacherId) {
        updateTeacherMutation(
          { teacherId, formData },
          { onSuccess: () => navigate("/admin/teachers") }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isEditMode && isTeacherLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isEditMode && teacherError) {
    return (
      <ErrorMessage
        message={teacherError.message || "Failed to load teacher"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditMode ? "Edit Teacher" : "Add New Teacher"}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => handleSubmit()} loading={isBusy}>
            {isEditMode ? "Update Teacher" : "Create Teacher"}
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
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Full Name" name="teacherName" error={toErr(errors.teacherName)}>
                <Input
                  type="text"
                  {...getFieldProps("teacherName")}
                  placeholder="Enter full name"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Email Address" name="teacherEmail" error={toErr(errors.teacherEmail)}>
                <Input
                  type="email"
                  {...getFieldProps("teacherEmail")}
                  placeholder="Enter email"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Phone" name="teacherPhone" error={toErr(errors.teacherPhone)}>
                <Input
                  type="text"
                  {...getFieldProps("teacherPhone")}
                  placeholder="Enter phone number"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Gender" name="teacherGender" error={toErr(errors.teacherGender)}>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="teacherGender"
                      value="male"
                      checked={values.teacherGender === "male"}
                      onChange={() => setFieldValue("teacherGender", "male")}
                      disabled={isBusy}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="teacherGender"
                      value="female"
                      checked={values.teacherGender === "female"}
                      onChange={() => setFieldValue("teacherGender", "female")}
                      disabled={isBusy}
                    />
                    Female
                  </label>
                </div>
              </FormRowVertical>
            </div>

            <FormRowVertical label="Address" name="teacherAddress" error={toErr(errors.teacherAddress)}>
              <Input
                type="text"
                {...getFieldProps("teacherAddress")}
                placeholder="Enter address"
                disabled={isBusy}
              />
            </FormRowVertical>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormRowVertical label="Date of Joining" name="teacherDateOfJoining" error={undefined}>
                <Input
                  type="date"
                  value={values.teacherDateOfJoining || ""}
                  onChange={(e) => setFieldValue("teacherDateOfJoining", e.target.value)}
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Husband Name" name="teacherHusband" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("teacherHusband")}
                  placeholder="Enter husband name (optional)"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Experience" name="teacherExperience" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("teacherExperience")}
                  placeholder="Enter experience"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Education" name="teacherEducation" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("teacherEducation")}
                  placeholder="Enter education"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <FormRowVertical label="Assigned Classes" name="assignedClasses" error={undefined}>
              <select
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                disabled={isBusy}
                value={values.assignedClasses || []}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                  setFieldValue("assignedClasses", selectedOptions);
                }}
              >
                {classes?.map((cls: { _id: string; name: string; section?: string }) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} {cls.section ? `- ${cls.section}` : ""}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple classes</p>
            </FormRowVertical>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Salary Amount" name="teacherSalary.amount" error={undefined}>
                <Input
                  type="number"
                  value={values.teacherSalary?.amount || 0}
                  onChange={(e) => {
                    setFieldValue("teacherSalary", {
                      ...values.teacherSalary,
                      amount: Number(e.target.value) || 0,
                      currency: values.teacherSalary?.currency || "PKR",
                    });
                  }}
                  placeholder="Enter salary amount"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Currency" name="teacherSalary.currency" error={undefined}>
                <select
                  value={values.teacherSalary?.currency || "PKR"}
                  onChange={(e) => {
                    setFieldValue("teacherSalary", {
                      ...values.teacherSalary,
                      amount: values.teacherSalary?.amount || 0,
                      currency: e.target.value,
                    });
                  }}
                  disabled={isBusy}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormRowVertical>
            </div>

            <FormRowVertical label="Profile Image" name="teacherProfileImage" error={undefined}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFieldValue("teacherProfileImage", file);
                }}
                disabled={isBusy}
              />
            </FormRowVertical>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" type="button" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" loading={isBusy}>
                {isEditMode ? "Update Teacher" : "Create Teacher"}
              </Button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default TeacherFormPage;

