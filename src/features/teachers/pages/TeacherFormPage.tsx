import { useCallback, useMemo } from "react";
import { useFormik, FormikProvider } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";

import { useTeacher } from "@/features/teachers/hooks/useTeacher";
import { useAddTeacher } from "@/features/teachers/hooks/useAddTeacher";
import { useUpdateTeacher } from "@/features/teachers/hooks/useUpdateTeacher";
import { useClasses } from "@/features/classes/hooks/useClasses";
import EntitySelect from "@/components/common/EntitySelect";

// =======================
//  Validation Schema
// =======================
const addTeacherSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().oneOf(["male", "female"], "Gender is required").required(),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
    .nullable(),
  address: Yup.string().nullable(),
  experience: Yup.string().nullable(),
  education: Yup.string().nullable(),
  husband: Yup.string().nullable(),
  dateOfJoining: Yup.date().nullable(),
  religion: Yup.string().nullable(),
  dob: Yup.date().nullable(),
  nationalId: Yup.string().nullable(),
  assignedClasses: Yup.array().of(Yup.string()).nullable(),
  salary: Yup.object().shape({
    amount: Yup.number().nullable(),
    currency: Yup.string().nullable(),
  }),
});

// =======================
//  Component
// =======================
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
      name: teacher?.name || "",
      email: teacher?.email || "",
      phone: teacher?.phone || "",
      address: teacher?.address || "",
      gender: teacher?.gender || "male",
      experience: teacher?.experience || "",
      education: teacher?.education || "",
      husband: teacher?.husband || "",
      dateOfJoining: teacher?.dateOfJoining || "",
      religion: teacher?.religion || "",
      dob: teacher?.DOB || "",
      nationalId: teacher?.nationalId || "",
      assignedClasses: teacher?.assignedClasses?.map((c: any) =>
        typeof c === "string" ? c : c?._id
      ) || [],
      salary: teacher?.salary || { amount: 0, currency: "PKR" },
      profileImage: undefined as File | undefined,
    }),
    [teacher]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: addTeacherSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      if (values.phone) formData.append("phone", values.phone);
      if (values.address) formData.append("address", values.address);
      formData.append("gender", values.gender);

      if (values.experience) formData.append("experience", values.experience);
      if (values.education) formData.append("education", values.education);
      if (values.husband) formData.append("husband", values.husband);
      if (values.dateOfJoining) formData.append("dateOfJoining", values.dateOfJoining);
      if (values.religion) formData.append("religion", values.religion);
      if (values.dob) formData.append("dob", values.dob);
      if (values.nationalId) formData.append("nationalId", values.nationalId);

      if (values.assignedClasses?.length) {
        values.assignedClasses.forEach((id) => formData.append("assignedClasses[]", id));
      }

      if (values.salary) formData.append("salary", JSON.stringify(values.salary));

      if (values.profileImage) formData.append("profileImage", values.profileImage);

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

  const currencyOptions = [
    { value: "PKR", label: "PKR" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const toErr = (e: unknown): string | undefined => (typeof e === "string" ? e : undefined);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditMode ? "Edit Teacher" : "Add New Teacher"}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} loading={isBusy}>
            {isEditMode ? "Update Teacher" : "Create Teacher"}
          </Button>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow p-5">
        <FormikProvider value={formik}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="space-y-6"
          >
            {/* Section 1: Basic Info */}
            <h3 className="text-lg font-medium text-gray-700">Basic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Full Name" name="name" error={toErr(errors.name)}>
                <Input type="text" placeholder="Enter full name" disabled={isBusy} {...getFieldProps("name")} />
              </FormRowVertical>

              <FormRowVertical label="Email Address" name="email" error={toErr(errors.email)}>
                <Input type="email" placeholder="Enter email" disabled={isBusy} {...getFieldProps("email")} />
              </FormRowVertical>

              <FormRowVertical label="Phone" name="phone" error={toErr(errors.phone)}>
                <Input type="text" placeholder="Enter phone" disabled={isBusy} {...getFieldProps("phone")} />
              </FormRowVertical>

              <FormRowVertical label="Gender" name="gender" error={toErr(errors.gender)}>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={() => setFieldValue("gender", "male")}
                      disabled={isBusy}
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
                      disabled={isBusy}
                    />
                    Female
                  </label>
                </div>
              </FormRowVertical>
            </div>

            {/* Section 2: Personal Info */}
            <h3 className="text-lg font-medium text-gray-700">Personal Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Address" name="address" error={toErr(errors.address)}>
                <Input type="text" placeholder="Enter address" disabled={isBusy} {...getFieldProps("address")} />
              </FormRowVertical>

              <FormRowVertical label="Religion" name="religion" error={toErr(errors.religion)}>
                <Input type="text" placeholder="Enter religion" disabled={isBusy} {...getFieldProps("religion")} />
              </FormRowVertical>

              <FormRowVertical label="Date of Birth" name="dob" error={toErr(errors.dob)}>
                <Input
                  type="date"
                  value={values.dob || ""}
                  onChange={(e) => setFieldValue("dob", e.target.value)}
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="National ID" name="nationalId" error={toErr(errors.nationalId)}>
                <Input type="text" placeholder="Enter CNIC" disabled={isBusy} {...getFieldProps("nationalId")} />
              </FormRowVertical>
            </div>

            {/* Section 3: Professional Info */}
            <h3 className="text-lg font-medium text-gray-700">Professional Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormRowVertical label="Education" name="education" error={toErr(errors.education)}>
                <Input type="text" placeholder="Enter education" disabled={isBusy} {...getFieldProps("education")} />
              </FormRowVertical>

              <FormRowVertical label="Experience" name="experience" error={toErr(errors.experience)}>
                <Input type="text" placeholder="Enter experience" disabled={isBusy} {...getFieldProps("experience")} />
              </FormRowVertical>

              <FormRowVertical label="Husband Name" name="husband" error={toErr(errors.husband)}>
                <Input type="text" placeholder="Enter husband name" disabled={isBusy} {...getFieldProps("husband")} />
              </FormRowVertical>

              <FormRowVertical label="Date of Joining" name="dateOfJoining" error={toErr(errors.dateOfJoining)}>
                <Input
                  type="date"
                  value={values.dateOfJoining || ""}
                  onChange={(e) => setFieldValue("dateOfJoining", e.target.value)}
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            {/* Section 4: Assigned Classes */}
            <h3 className="text-lg font-medium text-gray-700">Assignments</h3>
            <FormRowVertical label="Assigned Classes" name="assignedClasses" error={toErr(errors.assignedClasses)}>
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

            {/* Section 5: Salary */}
            <h3 className="text-lg font-medium text-gray-700">Salary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Salary Amount" name="salary.amount" error={toErr(errors.salary?.amount)}>
                <Input
                  type="number"
                  value={values.salary?.amount || 0}
                  onChange={(e) =>
                    setFieldValue("salary", { ...values.salary, amount: Number(e.target.value) || 0 })
                  }
                  placeholder="Enter salary"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Currency" name="salary.currency" error={toErr(errors.salary?.currency)}>
                <select
                  value={values.salary?.currency || "PKR"}
                  onChange={(e) => setFieldValue("salary", { ...values.salary, currency: e.target.value })}
                  disabled={isBusy}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencyOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </FormRowVertical>
            </div>

            {/* Section 6: Profile Image */}
            <h3 className="text-lg font-medium text-gray-700">Profile Image</h3>
            <FormRowVertical label="Profile Image" name="profileImage" error={undefined}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("profileImage", e.target.files?.[0])}
                disabled={isBusy}
              />
            </FormRowVertical>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" type="button" onClick={handleCancel}>
                Cancel
              </Button>
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
