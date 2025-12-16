import * as Yup from "yup";

export const addSessionSchema = Yup.object().shape({
  name: Yup.string().min(3).max(100).required('Session name is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string()
    .required('End date is required')
    .test('is-after-start', 'End date must be after start date', function(value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return new Date(value) > new Date(startDate);
    }),
  isActive: Yup.boolean(),
});

