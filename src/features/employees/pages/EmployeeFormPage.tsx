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
import ImageCropperInput from "@/components/common/ImageCropperInput";
import EntitySelect from "@/components/common/EntitySelect";
import Card from "@/components/common/Card";

const EmployeeFormPage = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const isEditMode = Boolean(employeeId);

  const { employee, isEmployeeLoading, employeeError } = useEmployee(employeeId);
  const { addEmployeeMutation, isAddingEmployee } = useAddEmployee();
  const { updateEmployeeMutation, isUpdatingEmployee } = useUpdateEmployee();

  const isEmployeePending = isAddingEmployee || isUpdatingEmployee;


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
      salary: employee?.salary || { amount: 0 },
      profileImage: employee?.profileImage,
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
        <div>
        <h2 className="text-3xl font-bold text-text-primary">
          {isEditMode ? "Edit Employee" : "Add New Employee"}
        </h2>
        <p className="text-sm text-text-secondary mt-2">
            {isEditMode
              ? "Update employee information and academic details"
              : "Fill in the details to create a new employee profile"}
        </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => handleSubmit()} loading={isEmployeePending}>
            {isEditMode ? "Update Employee" : "Create Employee"}
          </Button>
        </div>
      </div>

      {/* FORM CARD */}
        <FormikProvider value={formik}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="space-y-6"
          >
            <Card title="Employee Information" description="Basic details and profile information">
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
                    disabled={isEmployeePending} 
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
                    disabled={isEmployeePending} 
                  />
                </FormRowVertical>

                <FormRowVertical label="Phone" name="phone" error={errors.phone}>
                  <Input {...getFieldProps("phone")} placeholder="Enter phone number" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Designation" name="designation" error={errors.designation}>
                  <EntitySelect
                    entity="static"
                    staticOptions={[
                      { value: "teacher", label: "Teacher" },
                      { value: "principal", label: "Principal" },
                      { value: "accountant", label: "Accountant" },
                      { value: "management", label: "Management" },
                      { value: "admin", label: "Admin" },
                      { value: "other", label: "Other" },
                    ]}
                    value={values.designation}
                    onChange={(designation) => setFieldValue("designation", designation)}
                    placeholder="Select Designation"
                    isDisabled={isEmployeePending}
                  />
                </FormRowVertical>
              </div>

                </div>
              </div>
            </Card>



            {/* 3️⃣ WORK DETAILS */}
            <Card title="Employment Information" description="Job-related and professional details">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical label="Experience" name="experience">
                  <Input {...getFieldProps("experience")} placeholder="Enter experience" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Education" name="education">
                  <Input {...getFieldProps("education")} placeholder="Enter education" disabled={isEmployeePending} />
                </FormRowVertical>

                <FormRowVertical label="Date of Joining" name="dateOfJoining">
                  <Input
                    type="date"
                    value={values.dateOfJoining || ""}
                    onChange={(e) => setFieldValue("dateOfJoining", e.target.value)}
                    disabled={isEmployeePending}
                  />
                </FormRowVertical>
              </div>
            </div>
            </Card>

            {/* 4️⃣ SALARY */}
            <Card title="Salary Information" description="Compensation and payment details">
            <div className="p-8">
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
              </div>
            </div>
            </Card>

            {/* 2️⃣ PERSONAL DETAILS */}
            <Card
              title="Other Information"
              description="Additional personal or administrative details"
            >
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormRowVertical label="Date of Birth" name="dob">
                    <Input
                      type="date"
                      value={values.dob || ""}
                      onChange={(e) => setFieldValue("dob", e.target.value)}
                      disabled={isEmployeePending}
                   />
                 </FormRowVertical>

                <FormRowVertical label="Address" name="address" error={errors.address}>
                  <Input {...getFieldProps("address")} placeholder="Enter address" disabled={isEmployeePending} />
                </FormRowVertical>

                  <FormRowVertical label="Religion" name="religion">
                    <Input {...getFieldProps("religion")} placeholder="Enter religion" disabled={isEmployeePending} />
                 </FormRowVertical>
          
                  <FormRowVertical label="Husband Name" name="husband">
                    <Input {...getFieldProps("husband")} placeholder="Optional" disabled={isEmployeePending} />
                  </FormRowVertical>

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
          
                </div>
          
             </div>
          
            </Card>
          </form>
        </FormikProvider>
    </div>
  );
};


export default EmployeeFormPage;

