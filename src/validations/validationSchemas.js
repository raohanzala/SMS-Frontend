import * as Yup from 'yup';

// 🔹 Login Schema
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


export const registerSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  role: Yup.string().oneOf(['admin', 'teacher', 'student', 'parent'], 'Please select a valid role').required('Role is required'),
});

export const addStudentSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits").nullable(),
  address: Yup.string().max(100).nullable(),
  gender: Yup.string()
    .oneOf(["male", "female"], "Gender is required") // ✅ Add this line
    .required("Gender is required"),
  class: Yup.string().required('Class is required'),
  rollNumber: Yup.string().matches(/^[A-Za-z0-9-_]*$/, "Roll number can only contain letters, numbers, - or _").nullable(),
  parent: Yup.string().required('Parent is required'),
});

export const addParentSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be between 10–15 digits")
    .nullable(),
  address: Yup.string()
    .max(100, "Address can be at most 100 characters")
    .nullable(),
  gender: Yup.string()
    .required("Gender is required"),
  children: Yup.array()
    .of(Yup.string().matches(/^[a-fA-F0-9]{24}$/, "Invalid student ID"))
    .nullable(),
});

export const addSubjectsSchema = Yup.object().shape({
  class: Yup.string()
    .required("Please select a class")
    .typeError("Invalid class selection"),

  subjects: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .min(2, "Subject name must be at least 2 characters")
          .max(50, "Subject name cannot exceed 50 characters")
          .required("Subject name is required"),

        totalMarks: Yup.number()
          .typeError("Total marks must be a number")
          .min(1, "Total marks must be at least 1")
          .max(1000, "Total marks cannot exceed 1000")
          .required("Total marks are required"),
      })
    )
    .min(1, "At least one subject is required")
    .required("Subjects are required"),
});

