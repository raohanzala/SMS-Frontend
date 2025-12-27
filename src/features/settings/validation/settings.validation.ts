import * as Yup from "yup";

const breakTimeSchema = Yup.object().shape({
  startTime: Yup.string().nullable().optional(),
  duration: Yup.number().positive().nullable().optional(),
});

const periodConfigSchema = Yup.object().shape({
  periodDuration: Yup.number().positive().nullable().optional(),
  totalPeriods: Yup.number().positive().integer().nullable().optional(),
  breakAfterPeriods: Yup.number().positive().integer().nullable().optional(),
  breakDuration: Yup.number().positive().nullable().optional(),
});

const levelTimingsSchema = Yup.object().shape({
  startTime: Yup.string().nullable().optional(),
  endTime: Yup.string().nullable().optional(),
  breakTime: breakTimeSchema.optional(),
  periodConfig: periodConfigSchema.optional(),
});

export const settingsSchema = Yup.object().shape({
  defaultSchoolTiming: Yup.object().shape({
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
  }).required("Default school timing is required"),
  
  defaultPeriodConfig: Yup.object().shape({
    periodDuration: Yup.number()
      .positive("Duration must be positive")
      .required("Period duration is required"),
    totalPeriods: Yup.number()
      .positive("Total periods must be positive")
      .integer("Total periods must be an integer")
      .required("Total periods is required"),
    breakAfterPeriods: Yup.number().positive().integer().nullable().optional(),
    breakDuration: Yup.number().positive().nullable().optional(),
  }).required("Default period configuration is required"),
  
  classLevels: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Level name is required"),
        classIds: Yup.array()
          .of(Yup.string().required())
          .min(1, "At least one class is required"),
          // .required("Class IDs are required"),
        timings: levelTimingsSchema.optional(),
      })
    )
    .optional(),
    
  classWiseOverrides: Yup.array()
    .of(
      Yup.object().shape({
        classId: Yup.string().required("Class is required"),
        startTime: Yup.string().optional(),
        endTime: Yup.string().optional(),
        breakTime: breakTimeSchema.optional(),
        periodConfig: periodConfigSchema.optional(),
      })
    )
    .optional(),
});
