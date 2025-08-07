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
  name: Yup.string().min(3).max(50).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits").nullable(),
  address: Yup.string().max(100).nullable(),
  classId: Yup.string().nullable(),
  section: Yup.string().max(5).nullable(),
  rollNumber: Yup.string().matches(/^[A-Za-z0-9-_]*$/, "Roll number can only contain letters, numbers, - or _").nullable(),
});

