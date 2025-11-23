import * as Yup from "yup";

export const addParentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
    .required("Phone is required"),
  email: Yup.string().required("Email is required").email("Invalid email").nullable(),
  occupation: Yup.string().nullable(),
  income: Yup.number().typeError("Income must be a number").nullable(),
  nationalId: Yup.string().nullable(),
  childrenIds: Yup.array().of(Yup.string()).nullable(),
});

