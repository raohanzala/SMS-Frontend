import * as Yup from "yup";
export const addClassSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required('Class name is required'),
  monthlyFee: Yup.number().min(0).required('Monthly tuition fee is required'),
  classTeacherId: Yup.string().required('Class teacher is required'),
  levelId: Yup.string().required('Class level is required'),
});