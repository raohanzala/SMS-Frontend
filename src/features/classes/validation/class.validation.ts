import * as Yup from "yup";
export const addClassSchema = Yup.object().shape({
  className: Yup.string().min(3).max(50).required('Class name is required'),
  classMonthlyTuitionFee: Yup.number().min(0).required('Monthly tuition fee is required'),
  classTeacherId: Yup.string().required('Class teacher is required'),
});