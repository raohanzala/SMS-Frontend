export interface BreakTime {
  startTime?: string | null;
  duration?: number | null;
}

export interface PeriodConfig {
  periodDuration?: number | null;
  totalPeriods?: number | null;
  breakAfterPeriods?: number | null;
  breakDuration?: number | null;
}

export interface SchoolTiming {
  startTime: string;
  endTime: string;
}

export interface LevelTimings {
  startTime?: string | null;
  endTime?: string | null;
  breakTime?: BreakTime;
  periodConfig?: PeriodConfig;
}

export interface ClassLevel {
  name: string;
  classIds: string[];
  timings?: LevelTimings;
  _id?: string;
}

export interface ClassWiseOverride {
  classId: string;
  startTime?: string;
  endTime?: string;
  breakTime?: BreakTime;
  periodConfig?: PeriodConfig;
  _id?: string;
}

export interface Settings {
  _id: string;
  defaultSchoolTiming: SchoolTiming;
  defaultPeriodConfig: PeriodConfig;
  classLevels?: ClassLevel[];
  classWiseOverrides?: ClassWiseOverride[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AddSettingsInput {
  defaultSchoolTiming: SchoolTiming;
  defaultPeriodConfig: PeriodConfig;
  classLevels?: ClassLevel[];
  classWiseOverrides?: ClassWiseOverride[];
}

export interface UpdateSettingsInput {
  defaultSchoolTiming?: SchoolTiming;
  defaultPeriodConfig?: PeriodConfig;
  classLevels?: ClassLevel[];
  classWiseOverrides?: ClassWiseOverride[];
}
