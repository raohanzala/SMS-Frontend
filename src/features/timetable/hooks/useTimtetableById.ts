import { getTimetableByIdApi } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { TimetableBackendResponse, Timetable } from "../types/timetable.types";
import { useMemo } from "react";

// Helper to convert full day name to short format
const convertDayToShort = (day: string): string => {
  const dayMap: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
  };
  return dayMap[day] || day;
};

// Transform nested backend structure to flat timetable entry for editing
function transformTimetableForEdit(
  backendData: TimetableBackendResponse,
  periodId?: string
): Timetable | null {
  // If periodId is provided, find that specific period
  // Otherwise, get the first period from the first day
  let foundPeriod = null;
  let foundDay = null;

  for (const day of backendData.timetable) {
    if (periodId) {
      foundPeriod = day.periods.find((p) => p._id === periodId);
      if (foundPeriod) {
        foundDay = day;
        break;
      }
    } else {
      if (day.periods.length > 0) {
        foundPeriod = day.periods[0];
        foundDay = day;
        break;
      }
    }
  }

  if (!foundPeriod || !foundDay) {
    return null;
  }

  const classId =
    typeof backendData.classId === "object"
      ? backendData.classId
      : { _id: backendData.classId, name: "" };

  const subjectId =
    typeof foundPeriod.subjectId === "object"
      ? foundPeriod.subjectId
      : { _id: foundPeriod.subjectId, name: "" };

  const teacherId =
    typeof foundPeriod.teacherId === "object"
      ? foundPeriod.teacherId
      : { _id: foundPeriod.teacherId, name: "" };

  const originalTeacher =
    foundPeriod.originalTeacherId && typeof foundPeriod.originalTeacherId === "object"
      ? foundPeriod.originalTeacherId
      : foundPeriod.originalTeacherId
      ? { _id: foundPeriod.originalTeacherId, name: "" }
      : null;

  return {
    _id: foundPeriod._id,
    timetableDocId: backendData._id,
    class: classId,
    day: convertDayToShort(foundDay.day) as Timetable["day"],
    period: foundPeriod.period,
    startTime: foundPeriod.startTime,
    endTime: foundPeriod.endTime,
    subject: typeof subjectId === "object" ? subjectId.name : subjectId,
    subjectId: subjectId,
    teacher: teacherId,
    room: foundPeriod.room,
    notes: foundPeriod.notes,
    isSubstitute: foundPeriod.isSubstitute || false,
    originalTeacher: originalTeacher,
  };
}

export function useTimetableById() {
  const { timetableId } = useParams();
  const [searchParams] = useSearchParams();
  const periodId = searchParams.get("periodId") || undefined;
  
  const {
    data,
    isPending: isTimetableLoading,
    error: timetableError,
  } = useQuery({
    queryKey: ["timetable", timetableId, periodId],
    queryFn: () => getTimetableByIdApi(timetableId!),
    enabled: !!timetableId,
  });

  // Transform the nested backend structure to flat timetable entry
  const timetable = useMemo(() => {
    if (!data?.data) return null;
    
    // Check if it's already a flat structure (old format) or nested (new format)
    const backendData = data.data as TimetableBackendResponse | Timetable;
    
    // If it has a 'timetable' array, it's the new nested format
    if ('timetable' in backendData && Array.isArray(backendData.timetable)) {
      return transformTimetableForEdit(backendData as TimetableBackendResponse, periodId);
    }
    
    // Otherwise, it's already in the flat format
    return backendData as Timetable;
  }, [data?.data, periodId]);

  return { timetable, isTimetableLoading, timetableError };
}

