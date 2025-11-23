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

const EmployeeFormPage = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const isEditMode = Boolean(employeeId);

  const { employee, isEmployeeLoading, employeeError } = useEmployee(employeeId);
  const { addEmployeeMutation, isAddingEmployee } = useAddEmployee();
  const { updateEmployeeMutation, isUpdatingEmployee } = useUpdateEmployee();

  const isEmployeePending = isAddingEmployee || isUpdatingEmployee;

  const designationOptions = [
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues : {
      name: employee?.name || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      address: employee?.address || "",
      gender: employee?.gender || "male",
      designation: employee?.designation || "teacher",
      experience: employee?.experience || "",
      education: employee?.education || "",
      husband: employee?.husband || "",
      dateOfJoining: employee?.dateOfJoining || "",
      dob: employee?.DOB || "",
      religion: employee?.religion || "",
      nationalId: employee?.nationalId || "",
      salary: employee?.salary || { amount: 0, currency: "PKR" },
      profileImage: undefined as File | undefined,
    },
    validationSchema: addEmployeeSchema, // also update schema names
    onSubmit: (formValues) => {
      if (!isEditMode) {
        addEmployeeMutation({addEmployeeInput: formValues}, {
          onSuccess: () => navigate("/admin/employees"),
        });
      } else if (employeeId) {
        updateEmployeeMutation(
          { employeeId, updateEmployeeInput: formValues },
          { onSuccess: () => navigate("/admin/employees") }
        );
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleCancel = () => navigate(-1);

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
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditMode ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => handleSubmit()} loading={isEmployeePending}>
            {isEditMode ? "Update Employee" : "Create Employee"}
          </Button>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow p-5">
        <FormikProvider value={formik}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="space-y-6"
          >

            {/* 1️⃣ BASIC INFORMATION */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical label="Full Name" name="name" error={errors.name}>
                  <Input {...getFieldProps("name")} placeholder="Enter full name" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Email" name="email" error={errors.email}>
                  <Input {...getFieldProps("email")} placeholder="Enter email" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Phone" name="phone" error={errors.phone}>
                  <Input {...getFieldProps("phone")} placeholder="Enter phone number" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Designation" name="designation" error={errors.designation}>
                  <select
                    {...getFieldProps("designation")}
                    disabled={isEmployeePending}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {designationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </FormRowVertical>
              </div>
            </section>

            {/* 2️⃣ PERSONAL DETAILS */}
            <section>
              <FormRowVertical label="Address" name="address" error={errors.address}>
                <Input {...getFieldProps("address")} placeholder="Enter address" disabled={isEmployeePending} />
              </FormRowVertical>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormRowVertical label="Gender" name="gender" error={errors.gender}>
                  <div className="flex gap-4">
                    {["male", "female"].map((g) => (
                      <label key={g} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={values.gender === g}
                          onChange={() => setFieldValue("gender", g)}
                          disabled={isEmployeePending}
                        />
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </label>
                    ))}
                  </div>
                </FormRowVertical>

                <FormRowVertical label="Date of Joining" name="dateOfJoining">
                  <Input
                    type="date"
                    value={values.dateOfJoining || ""}
                    onChange={(e) => setFieldValue("dateOfJoining", e.target.value)}
                    disabled={isEmployeePending}
                  />
                </FormRowVertical>

                <FormRowVertical label="Date of Birth" name="dob">
                  <Input
                    type="date"
                    value={values.dob || ""}
                    onChange={(e) => setFieldValue("dob", e.target.value)}
                    disabled={isEmployeePending}
                  />
                </FormRowVertical>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical label="Husband Name" name="husband">
                  <Input {...getFieldProps("husband")} placeholder="Optional" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Religion" name="religion">
                  <Input {...getFieldProps("religion")} placeholder="Enter religion" disabled={isEmployeePending} />
                </FormRowVertical>
              </div>
            </section>

            {/* 3️⃣ WORK DETAILS */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical label="Experience" name="experience">
                  <Input {...getFieldProps("experience")} placeholder="Enter experience" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Education" name="education">
                  <Input {...getFieldProps("education")} placeholder="Enter education" disabled={isEmployeePending} />
                </FormRowVertical>
              </div>
            </section>

            {/* 4️⃣ SALARY */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical label="Amount" name="salary.amount">
                  <Input
                    type="number"
                    value={values.salary.amount}
                    onChange={(e) =>
                      setFieldValue("salary", {
                        ...values.salary,
                        amount: Number(e.target.value),
                      })
                    }
                    disabled={isEmployeePending}
                  />
                </FormRowVertical>

                <FormRowVertical label="Currency" name="salary.currency">
                  <select
                    value={values.salary.currency}
                    onChange={(e) =>
                      setFieldValue("salary", {
                        ...values.salary,
                        currency: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={isEmployeePending}
                  >
                    {currencyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </FormRowVertical>
              </div>
            </section>

            {/* 5️⃣ PROFILE IMAGE */}
            <section>
              <FormRowVertical label="Upload" name="profileImage">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFieldValue("profileImage", e.target.files?.[0])}
                  disabled={isEmployeePending}
                />
              </FormRowVertical>
            </section>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" loading={isEmployeePending}>
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

