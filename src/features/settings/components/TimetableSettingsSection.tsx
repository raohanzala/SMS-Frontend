import { FormikProvider, useFormik, FieldArray } from "formik";
import { FiPlus, FiTrash2, FiSave, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Card from "@/components/common/Card";
import { useAddSettings } from "../hooks/useAddSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { settingsSchema } from "../validation/settings.validation";
import EntitySelect from "@/components/common/EntitySelect";
import TimePicker from "@/components/common/TimePicker";
import { Settings, ClassLevel, ClassWiseOverride } from "../types/settings.types";

interface TimetableSettingsSectionProps {
  settings: Settings | null;
}

const TimetableSettingsSection = ({ settings }: TimetableSettingsSectionProps) => {
  const { addSettingsMutation, isAddingSettings } = useAddSettings();
  const { updateSettingsMutation, isUpdatingSettings } = useUpdateSettings();
  const isEditMode = !!settings;
  const isLoading = isAddingSettings || isUpdatingSettings;

  // Helper function to transform classLevels from backend
  const transformClassLevels = (levels: any[] = []) => {
    return levels.map((level) => ({
      name: level.name || "",
      timings: level.timings || {
        startTime: null,
        endTime: null,
        breakTime: {
          startTime: null,
          duration: null,
        },
        periodConfig: {
          periodDuration: null,
          totalPeriods: null,
          breakAfterPeriods: null,
        },
      },
    }));
  };

  // Helper function to transform classWiseOverrides from backend
  const transformClassWiseOverrides = (overrides: any[] = []) => {
    return overrides.map((override) => ({
      classId:
        typeof override.classId === "object"
          ? override.classId?._id
          : override.classId || "",
      startTime: override.startTime || "",
      endTime: override.endTime || "",
      breakTime: override.breakTime || {
        startTime: null,
        duration: null,
      },
      periodConfig: override.periodConfig || {
        periodDuration: null,
        totalPeriods: null,
        breakAfterPeriods: null,
        breakDuration: null,
      },
    }));
  };

  const formik = useFormik({
    initialValues: {
      defaultSchoolTiming: {
        startTime: settings?.timetable?.defaultSchoolTiming?.startTime || "08:00",
        endTime: settings?.timetable?.defaultSchoolTiming?.endTime || "14:00",
      },
      defaultPeriodConfig: {
        periodDuration: settings?.timetable?.defaultPeriodConfig?.periodDuration || 40,
        totalPeriods: settings?.timetable?.defaultPeriodConfig?.totalPeriods || 7,
        breakAfterPeriods: settings?.timetable?.defaultPeriodConfig?.breakAfterPeriods || null,
        breakDuration: settings?.timetable?.defaultPeriodConfig?.breakDuration || 20,
      },
      classLevels: transformClassLevels(settings?.timetable?.classLevels),
      classWiseOverrides: transformClassWiseOverrides(settings?.timetable?.classWiseOverrides),
    },
    validationSchema: settingsSchema,
    enableReinitialize: true,
    onSubmit: async (formValues) => {
      const payload = {
        timetable: {
          defaultSchoolTiming: {
            startTime: formValues.defaultSchoolTiming.startTime,
            endTime: formValues.defaultSchoolTiming.endTime,
          },
          defaultPeriodConfig: {
            periodDuration: Number(formValues.defaultPeriodConfig.periodDuration),
            totalPeriods: Number(formValues.defaultPeriodConfig.totalPeriods),
            ...(formValues.defaultPeriodConfig.breakAfterPeriods && {
              breakAfterPeriods: Number(formValues.defaultPeriodConfig.breakAfterPeriods),
            }),
            ...(formValues.defaultPeriodConfig.breakDuration && {
              breakDuration: Number(formValues.defaultPeriodConfig.breakDuration),
            }),
          },
          classLevels:
            formValues.classLevels.length > 0
              ? formValues.classLevels.map((level) => ({
                  name: level.name,
                  ...(level.timings && Object.keys(level.timings).length > 0 && {
                    timings: {
                      ...(level.timings.startTime && { startTime: level.timings.startTime }),
                      ...(level.timings.endTime && { endTime: level.timings.endTime }),
                      ...(level.timings.breakTime &&
                        (level.timings.breakTime.startTime || level.timings.breakTime.duration) && {
                          breakTime: {
                            ...(level.timings.breakTime.startTime && {
                              startTime: level.timings.breakTime.startTime,
                            }),
                            ...(level.timings.breakTime.duration && {
                              duration: Number(level.timings.breakTime.duration),
                            }),
                          },
                        }),
                      ...(level.timings.periodConfig &&
                        Object.values(level.timings.periodConfig).some((v) => v !== null) && {
                          periodConfig: {
                            ...(level.timings.periodConfig.periodDuration && {
                              periodDuration: Number(level.timings.periodConfig.periodDuration),
                            }),
                            ...(level.timings.periodConfig.totalPeriods && {
                              totalPeriods: Number(level.timings.periodConfig.totalPeriods),
                            }),
                            ...(level.timings.periodConfig.breakAfterPeriods && {
                              breakAfterPeriods: Number(level.timings.periodConfig.breakAfterPeriods),
                            }),
                          },
                        }),
                    },
                  }),
                }))
              : undefined,
          classWiseOverrides:
            formValues.classWiseOverrides.length > 0
              ? formValues.classWiseOverrides.map((override) => ({
                  classId: override.classId,
                  ...(override.startTime && { startTime: override.startTime }),
                  ...(override.endTime && { endTime: override.endTime }),
                  ...(override.breakTime &&
                    (override.breakTime.startTime || override.breakTime.duration) && {
                      breakTime: {
                        ...(override.breakTime.startTime && {
                          startTime: override.breakTime.startTime,
                        }),
                        ...(override.breakTime.duration && {
                          duration: Number(override.breakTime.duration),
                        }),
                      },
                    }),
                  ...(override.periodConfig &&
                    Object.values(override.periodConfig).some((v) => v !== null) && {
                      periodConfig: {
                        ...(override.periodConfig.periodDuration && {
                          periodDuration: Number(override.periodConfig.periodDuration),
                        }),
                        ...(override.periodConfig.totalPeriods && {
                          totalPeriods: Number(override.periodConfig.totalPeriods),
                        }),
                        ...(override.periodConfig.breakAfterPeriods && {
                          breakAfterPeriods: Number(override.periodConfig.breakAfterPeriods),
                        }),
                        ...(override.periodConfig.breakDuration && {
                          breakDuration: Number(override.periodConfig.breakDuration),
                        }),
                      },
                    }),
                }))
              : undefined,
        },
      };

      if (!isEditMode) {
        addSettingsMutation(payload);
      } else {
        updateSettingsMutation({
          settingsId: settings?._id,
          settingsData: payload,
        });
      }
    },
  });

  const { errors, values, setFieldValue, getFieldProps, handleSubmit, isSubmitting } = formik;

  console.log(errors, values)

  return (
    <Card
      title="Timetable Settings"
      description="Configure default timings and period configurations, plus level-specific and class-specific overrides"
    >
      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="px-8 py-6 space-y-6"
        >
          {/* Default School Timing Section */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Default School Timing (Fallback)
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Used as fallback when no level-specific or class-specific timing is configured
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormRowVertical
                label="Start Time"
                name="defaultSchoolTiming.startTime"
                error={errors.defaultSchoolTiming?.startTime as string}
              >
                <TimePicker
                  value={values.defaultSchoolTiming.startTime}
                  onChange={(time) =>
                    setFieldValue("defaultSchoolTiming.startTime", time)
                  }
                />
              </FormRowVertical>

              <FormRowVertical
                label="End Time"
                name="defaultSchoolTiming.endTime"
                error={errors.defaultSchoolTiming?.endTime as string}
              >
                <TimePicker
                  value={values.defaultSchoolTiming.endTime}
                  onChange={(time) =>
                    setFieldValue("defaultSchoolTiming.endTime", time)
                  }
                />
              </FormRowVertical>
            </div>
          </div>

          {/* Default Period Configuration Section */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Default Period Configuration (Fallback)
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Used as fallback when no level-specific or class-specific period config is configured
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormRowVertical
                label="Period Duration (minutes)"
                name="defaultPeriodConfig.periodDuration"
                error={errors.defaultPeriodConfig?.periodDuration as string}
              >
                <Input
                  type="number"
                  placeholder="e.g. 40"
                  min="1"
                  {...getFieldProps("defaultPeriodConfig.periodDuration")}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Total Periods"
                name="defaultPeriodConfig.totalPeriods"
                error={errors.defaultPeriodConfig?.totalPeriods as string}
              >
                <Input
                  type="number"
                  placeholder="e.g. 7"
                  min="1"
                  {...getFieldProps("defaultPeriodConfig.totalPeriods")}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Break After Periods (Optional)"
                name="defaultPeriodConfig.breakAfterPeriods"
                error={errors.defaultPeriodConfig?.breakAfterPeriods as string}
              >
                <Input
                  type="number"
                  placeholder="e.g. 3"
                  min="1"
                  {...getFieldProps("defaultPeriodConfig.breakAfterPeriods")}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Break Duration (minutes, Optional)"
                name="defaultPeriodConfig.breakDuration"
                error={errors.defaultPeriodConfig?.breakDuration as string}
              >
                <Input
                  type="number"
                  placeholder="e.g. 20"
                  min="0"
                  {...getFieldProps("defaultPeriodConfig.breakDuration")}
                />
              </FormRowVertical>
            </div>
          </div>

          {/* Class Levels Section */}
          <ClassLevelsSection
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            getFieldProps={getFieldProps}
            isLoading={isLoading}
          />

          {/* Class Wise Overrides Section */}
          <ClassWiseOverridesSection
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            getFieldProps={getFieldProps}
            isLoading={isLoading}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              type="submit"
              loading={isLoading || isSubmitting}
              className="flex items-center gap-2"
            >
              <FiSave className="w-4 h-4" />
              {isEditMode ? "Update Timetable Settings" : "Save Timetable Settings"}
            </Button>
          </div>
        </form>
      </FormikProvider>
    </Card>
  );
};

// Class Levels Section Component
const ClassLevelsSection = ({ values, errors, setFieldValue, getFieldProps, isLoading }: any) => {
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set());

  const toggleLevel = (index: number) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedLevels(newExpanded);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Class Levels (Optional)</h3>
          <p className="text-sm text-gray-500 mt-1">
            Configure levels with classes and level-specific timings/period configs
          </p>
        </div>
        <FieldArray name="classLevels">
          {(arrayHelpers: any) => (
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  name: "",
                  timings: {
                    startTime: null,
                    endTime: null,
                    breakTime: { startTime: null, duration: null },
                    periodConfig: {
                      periodDuration: null,
                      totalPeriods: null,
                      breakAfterPeriods: null,
                    },
                  },
                })
              }
              variant="secondary"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <FiPlus className="w-4 h-4" />
              Add Level
            </Button>
          )}
        </FieldArray>
      </div>

      <FieldArray name="classLevels">
        {(arrayHelpers: any) => (
          <div className="space-y-4">
            {values.classLevels.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No class levels configured. Click &quot;Add Level&quot; to create one.
              </p>
            )}
            {values.classLevels.map((level: ClassLevel, index: number) => (
              <LevelCard
                key={index}
                level={level}
                index={index}
                errors={errors}
                setFieldValue={setFieldValue}
                getFieldProps={getFieldProps}
                isLoading={isLoading}
                onRemove={() => arrayHelpers.remove(index)}
                isExpanded={expandedLevels.has(index)}
                onToggle={() => toggleLevel(index)}
              />
            ))}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

// Level Card Component
const LevelCard = ({
  level,
  index,
  errors,
  setFieldValue,
  getFieldProps,
  isLoading,
  onRemove,
  isExpanded,
  onToggle,
}: any) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            className="p-1"
            onClick={onToggle}
          >
            {isExpanded ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </Button>
          <h4 className="font-medium text-gray-700">
            Level {index + 1}: {level.name || "Unnamed Level"}
          </h4>
        </div>
        <Button
          type="button"
          onClick={onRemove}
          variant="danger"
          className="p-2"
          disabled={isLoading}
        >
          <FiTrash2 className="w-4 h-4" />
        </Button>
      </div>

      {isExpanded && (
        <div className="p-5 space-y-4">
          <FormRowVertical
            label="Level Name"
            name={`classLevels.${index}.name`}
            error={(errors.classLevels as any)?.[index]?.name as string}
          >
            <Input
              type="text"
              placeholder="e.g. KG, Primary, High"
              {...getFieldProps(`classLevels.${index}.name`)}
              disabled={isLoading}
            />
          </FormRowVertical>

          {/* Level Timings */}
          <div className="mt-4 pt-4 border-t">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">
              Level-Specific Timings (Optional)
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical label="Start Time (Optional)" name={`classLevels.${index}.timings.startTime`}>
                <TimePicker
                  value={level.timings?.startTime || ""}
                  onChange={(time: string) =>
                    setFieldValue(`classLevels.${index}.timings.startTime`, time || null)
                  }
                />
              </FormRowVertical>
              <FormRowVertical label="End Time (Optional)" name={`classLevels.${index}.timings.endTime`}>
                <TimePicker
                  value={level.timings?.endTime || ""}
                  onChange={(time: string) =>
                    setFieldValue(`classLevels.${index}.timings.endTime`, time || null)
                  }
                />
              </FormRowVertical>
            </div>

            {/* Break Time */}
            <div className="mt-4 pt-4 border-t">
              <h6 className="text-xs font-medium text-gray-600 mb-3">Break Time (Optional)</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical label="Break Start Time" name={`classLevels.${index}.timings.breakTime.startTime`}>
                  <TimePicker
                    value={level.timings?.breakTime?.startTime || ""}
                    onChange={(time: string) =>
                      setFieldValue(`classLevels.${index}.timings.breakTime.startTime`, time || null)
                    }
                  />
                </FormRowVertical>
                <FormRowVertical label="Break Duration (minutes)" name={`classLevels.${index}.timings.breakTime.duration`}>
                  <Input
                    type="number"
                    placeholder="e.g. 15"
                    min="0"
                    value={level.timings?.breakTime?.duration || ""}
                    onChange={(e: any) =>
                      setFieldValue(
                        `classLevels.${index}.timings.breakTime.duration`,
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    disabled={isLoading}
                  />
                </FormRowVertical>
              </div>
            </div>

            {/* Level Period Config */}
            <div className="mt-4 pt-4 border-t">
              <h6 className="text-xs font-medium text-gray-600 mb-3">
                Level-Specific Period Configuration (Optional)
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormRowVertical label="Period Duration" name={`classLevels.${index}.timings.periodConfig.periodDuration`}>
                  <Input
                    type="number"
                    placeholder="e.g. 45"
                    min="1"
                    value={level.timings?.periodConfig?.periodDuration || ""}
                    onChange={(e: any) =>
                      setFieldValue(
                        `classLevels.${index}.timings.periodConfig.periodDuration`,
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    disabled={isLoading}
                  />
                </FormRowVertical>
                <FormRowVertical label="Total Periods" name={`classLevels.${index}.timings.periodConfig.totalPeriods`}>
                  <Input
                    type="number"
                    placeholder="e.g. 8"
                    min="1"
                    value={level.timings?.periodConfig?.totalPeriods || ""}
                    onChange={(e: any) =>
                      setFieldValue(
                        `classLevels.${index}.timings.periodConfig.totalPeriods`,
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    disabled={isLoading}
                  />
                </FormRowVertical>
                <FormRowVertical label="Break After Periods" name={`classLevels.${index}.timings.periodConfig.breakAfterPeriods`}>
                  <Input
                    type="number"
                    placeholder="e.g. 4"
                    min="1"
                    value={level.timings?.periodConfig?.breakAfterPeriods || ""}
                    onChange={(e: any) =>
                      setFieldValue(
                        `classLevels.${index}.timings.periodConfig.breakAfterPeriods`,
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    disabled={isLoading}
                  />
                </FormRowVertical>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Class Wise Overrides Section Component
const ClassWiseOverridesSection = ({ values, errors, setFieldValue, getFieldProps, isLoading }: any) => {
  const [expandedOverrides, setExpandedOverrides] = useState<Set<number>>(new Set());

  const toggleOverride = (index: number) => {
    const newExpanded = new Set(expandedOverrides);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedOverrides(newExpanded);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Class-Wise Overrides (Optional)</h3>
          <p className="text-sm text-gray-500 mt-1">
            Override timings and period configuration for specific classes
          </p>
        </div>
        <FieldArray name="classWiseOverrides">
          {(arrayHelpers: any) => (
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  classId: "",
                  startTime: "",
                  endTime: "",
                  breakTime: { startTime: null, duration: null },
                  periodConfig: {
                    periodDuration: null,
                    totalPeriods: null,
                    breakAfterPeriods: null,
                    breakDuration: null,
                  },
                })
              }
              variant="secondary"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <FiPlus className="w-4 h-4" />
              Add Override
            </Button>
          )}
        </FieldArray>
      </div>

      <FieldArray name="classWiseOverrides">
        {(arrayHelpers: any) => (
          <div className="space-y-4">
            {values.classWiseOverrides.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No class-wise overrides configured. Click &quot;Add Override&quot; to create one.
              </p>
            )}
            {values.classWiseOverrides.map((override: ClassWiseOverride, index: number) => (
              <OverrideCard
                key={index}
                override={override}
                index={index}
                errors={errors}
                setFieldValue={setFieldValue}
                getFieldProps={getFieldProps}
                isLoading={isLoading}
                onRemove={() => arrayHelpers.remove(index)}
                isExpanded={expandedOverrides.has(index)}
                onToggle={() => toggleOverride(index)}
              />
            ))}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

// Override Card Component
const OverrideCard = ({
  override,
  index,
  errors,
  setFieldValue,
  getFieldProps,
  isLoading,
  onRemove,
  isExpanded,
  onToggle,
}: any) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            className="p-1"
            onClick={onToggle}
          >
            {isExpanded ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </Button>
          <h4 className="font-medium text-gray-700">
            Override {index + 1}
          </h4>
        </div>
        <Button
          type="button"
          onClick={onRemove}
          variant="danger"
          className="p-2"
          disabled={isLoading}
        >
          <FiTrash2 className="w-4 h-4" />
        </Button>
      </div>

      {isExpanded && (
        <div className="p-5 space-y-4">
          <FormRowVertical
            label="Select Class"
            name={`classWiseOverrides.${index}.classId`}
            error={(errors.classWiseOverrides as any)?.[index]?.classId as string}
          >
            <EntitySelect
              entity="class"
              value={override.classId}
              onChange={(value: string | string[] | null) => {
                const classId = Array.isArray(value) ? value[0] : value;
                setFieldValue(`classWiseOverrides.${index}.classId`, classId || "");
              }}
              placeholder="Select class"
              isDisabled={isLoading}
            />
          </FormRowVertical>

          {/* Class Override Timings */}
          <div className="mt-4 pt-4 border-t">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">
              Class-Specific Timings (Optional)
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormRowVertical
                label="Start Time (Optional)"
                name={`classWiseOverrides.${index}.startTime`}
              >
                <TimePicker
                  value={override.startTime || ""}
                  onChange={(time: string) =>
                    setFieldValue(`classWiseOverrides.${index}.startTime`, time || "")
                  }
                />
              </FormRowVertical>
              <FormRowVertical
                label="End Time (Optional)"
                name={`classWiseOverrides.${index}.endTime`}
              >
                <TimePicker
                  value={override.endTime || ""}
                  onChange={(time: string) =>
                    setFieldValue(`classWiseOverrides.${index}.endTime`, time || "")
                  }
                />
              </FormRowVertical>
            </div>

            {/* Break Time */}
            <div className="mt-4 pt-4 border-t">
              <h6 className="text-xs font-medium text-gray-600 mb-3">Break Time (Optional)</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormRowVertical
                  label="Break Start Time"
                  name={`classWiseOverrides.${index}.breakTime.startTime`}
                >
                  <TimePicker
                    value={override.breakTime?.startTime || ""}
                    onChange={(time: string) =>
                      setFieldValue(
                        `classWiseOverrides.${index}.breakTime.startTime`,
                        time || null
                      )
                    }
                  />
                </FormRowVertical>
                <FormRowVertical
                  label="Break Duration (minutes)"
                  name={`classWiseOverrides.${index}.breakTime.duration`}
                >
                  <Input
                    type="number"
                    placeholder="e.g. 15"
                    min="0"
                    value={override.breakTime?.duration || ""}
                    onChange={(e: any) =>
                      setFieldValue(
                        `classWiseOverrides.${index}.breakTime.duration`,
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    disabled={isLoading}
                  />
                </FormRowVertical>
              </div>
            </div>
          </div>

          {/* Class Override Period Config */}
          <div className="mt-4 pt-4 border-t">
            <h6 className="text-xs font-medium text-gray-600 mb-3">
              Class-Specific Period Configuration (Optional)
            </h6>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormRowVertical
                label="Period Duration"
                name={`classWiseOverrides.${index}.periodConfig.periodDuration`}
              >
                <Input
                  type="number"
                  placeholder="e.g. 45"
                  min="1"
                  value={override.periodConfig?.periodDuration || ""}
                  onChange={(e: any) =>
                    setFieldValue(
                      `classWiseOverrides.${index}.periodConfig.periodDuration`,
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  disabled={isLoading}
                />
              </FormRowVertical>
              <FormRowVertical
                label="Total Periods"
                name={`classWiseOverrides.${index}.periodConfig.totalPeriods`}
              >
                <Input
                  type="number"
                  placeholder="e.g. 8"
                  min="1"
                  value={override.periodConfig?.totalPeriods || ""}
                  onChange={(e: any) =>
                    setFieldValue(
                      `classWiseOverrides.${index}.periodConfig.totalPeriods`,
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  disabled={isLoading}
                />
              </FormRowVertical>
              <FormRowVertical
                label="Break After Periods"
                name={`classWiseOverrides.${index}.periodConfig.breakAfterPeriods`}
              >
                <Input
                  type="number"
                  placeholder="e.g. 4"
                  min="1"
                  value={override.periodConfig?.breakAfterPeriods || ""}
                  onChange={(e: any) =>
                    setFieldValue(
                      `classWiseOverrides.${index}.periodConfig.breakAfterPeriods`,
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  disabled={isLoading}
                />
              </FormRowVertical>
              <FormRowVertical
                label="Break Duration"
                name={`classWiseOverrides.${index}.periodConfig.breakDuration`}
              >
                <Input
                  type="number"
                  placeholder="e.g. 20"
                  min="0"
                  value={override.periodConfig?.breakDuration || ""}
                  onChange={(e: any) =>
                    setFieldValue(
                      `classWiseOverrides.${index}.periodConfig.breakDuration`,
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  disabled={isLoading}
                />
              </FormRowVertical>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableSettingsSection;

