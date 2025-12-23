import { useCallback, useMemo } from "react";
import { useFormik, FormikProvider } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";

import { useTeacher } from "@/features/teachers/hooks/useTeacher";
import { useAddTeacher } from "@/features/teachers/hooks/useAddTeacher";
import { useUpdateTeacher } from "@/features/teachers/hooks/useUpdateTeacher";
import { addTeacherSchema } from "../validations/teacher.validation";
import ImageCropperInput from "@/components/common/ImageCropperInput";
import EntitySelect from "@/components/common/EntitySelect";
import { useSettings } from "@/features/settings/hooks/useSettings";
import Card from "@/components/common/Card";

const TeacherFormPage = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const isEditMode = Boolean(teacherId);

  const { teacher, isTeacherLoading, teacherError } = useTeacher(teacherId);
  const { addTeacherMutation, isAddingTeacher } = useAddTeacher();
  const { updateTeacherMutation, isUpdatingTeacher } = useUpdateTeacher();
  const {settings} = useSettings();
  const classLevels = settings?.classLevels || [];

  console.log(classLevels)

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
      salary: teacher?.salary || { amount: 0, currency: "PKR" },
      profileImage: teacher?.profileImage as File | undefined,
      levelsIds: teacher?.levelsIds || [],
    }),
    [teacher]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: addTeacherSchema,
    onSubmit: async (formValues) => {
      console.log(formValues);

      if (!isEditMode) {
        addTeacherMutation({addTeacherInput: formValues}, {
          onSuccess: () => navigate("/admin/teachers"),
        });
      } else if (teacherId) {
        updateTeacherMutation(
          { teacherId, updateTeacherInput: formValues },
          { onSuccess: () => navigate("/admin/teachers") }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  console.log(errors, values)

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


  const toErr = (e: unknown): string | undefined => (typeof e === "string" ? e : undefined);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
        <h2 className="text-3xl font-bold text-text-primary">
          {isEditMode ? "Edit Teacher" : "Add New Teacher"}
        </h2>
        <p className="text-sm text-text-secondary mt-2">
            {isEditMode
              ? "Update teacher information and academic details"
              : "Fill in the details to create a new teacher profile"}
          </p>
          </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} loading={isBusy}>
            {isEditMode ? "Update Teacher" : "Create Teacher"}
          </Button>
        </div>
      </div>

      {/* Form Container */}
        <FormikProvider value={formik}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="space-y-8"
          >
          <Card 
            title="Teacher Information" 
            description="Basic details and profile information"
          >
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Profile image */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <ImageCropperInput
                      value={values.profileImage}
                      onChange={(file) => setFieldValue("profileImage", file)}
                      aspect={1}
                    />
                  </div>
                </div>

                { /* Section 1: Basic Info */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormRowVertical 
                    label="Full Name" 
                    name="name" 
                    error={toErr(errors.name)}
                    required
                  >
                    <Input 
                      type="text" 
                      placeholder="Enter full name" 
                      disabled={isBusy} {...getFieldProps("name")} 
                    />
                  </FormRowVertical>

                  <FormRowVertical 
                    label="Email"
                    name="email" 
                    error={toErr(errors.email)}
                    required
                  >
                    <Input 
                      type="email" 
                      placeholder="Enter email" 
                      disabled={isBusy} {...getFieldProps("email")} 
                    />
                  </FormRowVertical>

                  <FormRowVertical label="Phone" name="phone" error={toErr(errors.phone)}>
                    <Input type="text" placeholder="Enter phone" disabled={isBusy} {...getFieldProps("phone")} />
                  </FormRowVertical>
                </div>

              </div>
            </div>
          </Card>


            {/* Section 3: Professional Info */}
            <Card title="Professional Information" description="Teaching roles, subjects, and class assignments">
              <div className="p-8">
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
            <FormRowVertical label="Teacher Level" name="levelsIds" error={toErr(errors.levelsIds)}>
              <EntitySelect
                entity="static"
                staticOptions={classLevels.map(classLevel => ({ value: classLevel._id, label: classLevel.name })) }
                value={values.levelsIds}
                onChange={(levelsIds) => setFieldValue("levelsIds", levelsIds)}
                placeholder="Select Teacher Level"
                isMulti={true}
                isDisabled={isBusy}
              />
            </FormRowVertical>
            </div>
            </div>
            </Card>

            {/* Section 5: Salary */}
            <Card title="Salary & Employment Details" description="Compensation and employment-related information">
              <div className="p-8">
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
                <EntitySelect
                  entity="static"
                  staticOptions={[
                    { value: "PKR", label: "PKR" },
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                  ]}
                  value={values.salary?.currency || "PKR"}
                  onChange={(currency) => setFieldValue("salary", { ...values.salary, currency: currency as string })}
                  placeholder="Select Currency"
                  isDisabled={isBusy}
                />
              </FormRowVertical>
            </div>
            </div>
            </Card>

            {/* Section 6: Other informations */}
            <Card title="Other Information" description="Additional personal or administrative details">
              <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Date of Birth" name="dob" error={toErr(errors.dob)}>
                <Input
                  type="date"
                  value={values.dob || ""}
                  onChange={(e) => setFieldValue("dob", e.target.value)}
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Address" name="address" error={toErr(errors.address)}>
                <Input type="text" placeholder="Enter address" disabled={isBusy} {...getFieldProps("address")} />
              </FormRowVertical>

              <FormRowVertical label="Religion" name="religion" error={toErr(errors.religion)}>
                <Input type="text" placeholder="Enter religion" disabled={isBusy} {...getFieldProps("religion")} />
              </FormRowVertical>

              <FormRowVertical label="National ID" name="nationalId" error={toErr(errors.nationalId)}>
                <Input type="text" placeholder="Enter CNIC" disabled={isBusy} {...getFieldProps("nationalId")} />
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
            </div>
          </Card>

            {/* Actions */}
            {/* <div className="flex justify-end gap-2">
              <Button variant="ghost" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" loading={isBusy}>
                {isEditMode ? "Update Teacher" : "Create Teacher"}
              </Button>
            </div> */}
          </form>
        </FormikProvider>
    </div>
  );
};

export default TeacherFormPage;
