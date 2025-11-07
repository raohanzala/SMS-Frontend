import { useCallback, useMemo } from "react";
import { FormikProvider, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/common/Button";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useAddEmployee } from "@/features/employees/hooks/useAddEmployee";
import { useUpdateEmployee } from "@/features/employees/hooks/useUpdateEmployee";
import { useEmployee } from "@/features/employees/hooks/useEmployee";
import { addEmployeeSchema } from "@/features/employees/validations/employee.validation";
import { EmployeeDesignation } from "@/features/employees/types/employee.types";

const EmployeeFormPage = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const isEditMode = Boolean(employeeId);

  const { employee, isEmployeeLoading, employeeError } = useEmployee(employeeId);
  const { addEmployeeMutation, isAddingEmployee } = useAddEmployee();
  const { updateEmployeeMutation, isUpdatingEmployee } = useUpdateEmployee();

  const isBusy = isAddingEmployee || isUpdatingEmployee;

  const initialValues = useMemo(
    () => ({
      employeeName: employee?.name || "",
      employeeEmail: employee?.email || "",
      employeePhone: employee?.phone || "",
      employeeAddress: employee?.address || "",
      employeeGender: employee?.gender || "male" as "male" | "female",
      employeeDesignation: employee?.designation || "teacher" as EmployeeDesignation,
      employeeExperience: employee?.experience || "",
      employeeEducation: employee?.education || "",
      employeeHusband: employee?.husband || "",
      employeeDateOfJoining: employee?.dateOfJoining || "",
      employeeSalary: employee?.salary || { amount: 0, currency: "PKR" },
      employeeProfileImage: undefined as File | undefined,
    }),
    [employee]
  );

  type FormValues = {
    employeeName: string;
    employeeEmail: string;
    employeePhone?: string;
    employeeAddress?: string;
    employeeGender: "male" | "female";
    employeeDesignation: EmployeeDesignation;
    employeeExperience?: string;
    employeeEducation?: string;
    employeeHusband?: string;
    employeeDateOfJoining?: string;
    employeeSalary?: { amount: number; currency: string };
    employeeProfileImage?: File | undefined;
  };

  const toErr = (e: unknown): string | undefined =>
    typeof e === "string" ? e : undefined;

  const designationOptions: { value: EmployeeDesignation; label: string }[] = [
    { value: "teacher", label: "Teacher" },
    { value: "principal", label: "Principal" },
    { value: "accountant", label: "Accountant" },
    { value: "management", label: "Management" },
    { value: "admin", label: "Admin" },
    { value: "other", label: "Other" },
  ];

  const currencyOptions = [
    { value: "PKR", label: "PKR" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: addEmployeeSchema,
    onSubmit: async (formValues) => {
      const formData = new FormData();
      
      // Append all fields to FormData
      formData.append("employeeName", formValues.employeeName);
      formData.append("employeeEmail", formValues.employeeEmail);
      if (formValues.employeePhone) formData.append("employeePhone", formValues.employeePhone);
      if (formValues.employeeAddress) formData.append("employeeAddress", formValues.employeeAddress);
      formData.append("employeeGender", formValues.employeeGender);
      formData.append("employeeDesignation", formValues.employeeDesignation);
      if (formValues.employeeExperience) formData.append("employeeExperience", formValues.employeeExperience);
      if (formValues.employeeEducation) formData.append("employeeEducation", formValues.employeeEducation);
      if (formValues.employeeHusband) formData.append("employeeHusband", formValues.employeeHusband);
      if (formValues.employeeDateOfJoining) formData.append("employeeDateOfJoining", formValues.employeeDateOfJoining);
      
      if (formValues.employeeSalary) {
        formData.append("employeeSalary", JSON.stringify(formValues.employeeSalary));
      }
      
      if (formValues.employeeProfileImage) {
        formData.append("profileImage", formValues.employeeProfileImage);
      }

      if (!isEditMode) {
        addEmployeeMutation(formData, {
          onSuccess: () => navigate("/admin/employees"),
        });
      } else if (employeeId) {
        updateEmployeeMutation(
          { employeeId, formData },
          { onSuccess: () => navigate("/admin/employees") }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isEditMode && isEmployeeLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isEditMode && employeeError) {
    return (
      <ErrorMessage
        message={employeeError.message || "Failed to load employee"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditMode ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => handleSubmit()} loading={isBusy}>
            {isEditMode ? "Update Employee" : "Create Employee"}
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
              <FormRowVertical label="Full Name" name="employeeName" error={toErr(errors.employeeName)}>
                <Input
                  type="text"
                  {...getFieldProps("employeeName")}
                  placeholder="Enter full name"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Email Address" name="employeeEmail" error={toErr(errors.employeeEmail)}>
                <Input
                  type="email"
                  {...getFieldProps("employeeEmail")}
                  placeholder="Enter email"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Phone" name="employeePhone" error={toErr(errors.employeePhone)}>
                <Input
                  type="text"
                  {...getFieldProps("employeePhone")}
                  placeholder="Enter phone number"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Designation" name="employeeDesignation" error={toErr(errors.employeeDesignation)}>
                <select
                  {...getFieldProps("employeeDesignation")}
                  disabled={isBusy}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {designationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormRowVertical>
            </div>

            <FormRowVertical label="Address" name="employeeAddress" error={toErr(errors.employeeAddress)}>
              <Input
                type="text"
                {...getFieldProps("employeeAddress")}
                placeholder="Enter address"
                disabled={isBusy}
              />
            </FormRowVertical>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormRowVertical label="Gender" name="employeeGender" error={toErr(errors.employeeGender)}>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="employeeGender"
                      value="male"
                      checked={values.employeeGender === "male"}
                      onChange={() => setFieldValue("employeeGender", "male")}
                      disabled={isBusy}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="employeeGender"
                      value="female"
                      checked={values.employeeGender === "female"}
                      onChange={() => setFieldValue("employeeGender", "female")}
                      disabled={isBusy}
                    />
                    Female
                  </label>
                </div>
              </FormRowVertical>

              <FormRowVertical label="Date of Joining" name="employeeDateOfJoining" error={undefined}>
                <Input
                  type="date"
                  value={values.employeeDateOfJoining || ""}
                  onChange={(e) => setFieldValue("employeeDateOfJoining", e.target.value)}
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Husband Name" name="employeeHusband" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("employeeHusband")}
                  placeholder="Enter husband name (optional)"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Experience" name="employeeExperience" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("employeeExperience")}
                  placeholder="Enter experience"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Education" name="employeeEducation" error={undefined}>
                <Input
                  type="text"
                  {...getFieldProps("employeeEducation")}
                  placeholder="Enter education"
                  disabled={isBusy}
                />
              </FormRowVertical>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Salary Amount" name="employeeSalary.amount" error={undefined}>
                <Input
                  type="number"
                  value={values.employeeSalary?.amount || 0}
                  onChange={(e) => {
                    setFieldValue("employeeSalary", {
                      ...values.employeeSalary,
                      amount: Number(e.target.value) || 0,
                      currency: values.employeeSalary?.currency || "PKR",
                    });
                  }}
                  placeholder="Enter salary amount"
                  disabled={isBusy}
                />
              </FormRowVertical>

              <FormRowVertical label="Currency" name="employeeSalary.currency" error={undefined}>
                <select
                  value={values.employeeSalary?.currency || "PKR"}
                  onChange={(e) => {
                    setFieldValue("employeeSalary", {
                      ...values.employeeSalary,
                      amount: values.employeeSalary?.amount || 0,
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

            <FormRowVertical label="Profile Image" name="employeeProfileImage" error={undefined}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFieldValue("employeeProfileImage", file);
                }}
                disabled={isBusy}
              />
            </FormRowVertical>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" type="button" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" loading={isBusy}>
                {isEditMode ? "Update Employee" : "Create Employee"}
              </Button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default EmployeeFormPage;

