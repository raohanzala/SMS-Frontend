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

