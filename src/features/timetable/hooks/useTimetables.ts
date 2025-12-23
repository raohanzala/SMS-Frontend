import { getAllTimetablesApi } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TimetableBackendResponse, Timetable } from "../types/timetable.types";
import { useMemo } from "react";

// Transform nested backend structure to flat array of timetable entries
function transformTimetableData(
  backendData: TimetableBackendResponse[]
): Timetable[] {
  const flattened: Timetable[] = [];

  backendData.forEach((timetableDoc) => {
    const classId =
      typeof timetableDoc.classId === "object"
        ? timetableDoc.classId
        : { _id: timetableDoc.classId, name: "" };

    timetableDoc.timetable.forEach((day) => {
      day.periods.forEach((period) => {
        const subjectId =
          typeof period.subjectId === "object"
            ? period?.subjectId
            : { _id: period?.subjectId, name: "" };
        const teacherId =
          typeof period.teacherId === "object"
            ? period?.teacherId
            : { _id: period.teacherId, name: "" };
        const originalTeacher =
          period.originalTeacherId && typeof period.originalTeacherId === "object"
            ? period.originalTeacherId
            : period.originalTeacherId
            ? { _id: period.originalTeacherId, name: "" }
            : null;

        // Convert full day name to short format for compatibility
        const dayShortMap: Record<string, string> = {
          Monday: "Mon",
          Tuesday: "Tue",
          Wednesday: "Wed",
          Thursday: "Thu",
          Friday: "Fri",
          Saturday: "Sat",
        };
        const dayShort = dayShortMap[day.day] || day.day;

        flattened.push({
          _id: period._id, // Use period _id for identification
          timetableDocId: timetableDoc._id, // Store timetable document _id for editing
          class: classId,
          day: dayShort as Timetable["day"], // Convert to short format for compatibility
          period: period.period,
          startTime: period.startTime,
          endTime: period.endTime,
          subject: typeof subjectId === "object" ? subjectId?.name : subjectId,
          subjectId: subjectId,
          teacher: teacherId,
          room: period.room,
          notes: period.notes,
          isSubstitute: period.isSubstitute || false,
          originalTeacher: originalTeacher,
        });
      });
    });
  });

  return flattened;
}

export function useTimetables() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 50;
  const classId = searchParams.get("classId") || "";
  const teacherId = searchParams.get("teacherId") || "";
  const day = searchParams.get("day") || "";
  const period = searchParams.get("period") || "";
  const room = searchParams.get("room") || "";

  const params: Record<string, string | number> = {
    page,
    limit,
  };

  if (classId) params.classId = classId;
  if (teacherId) params.teacherId = teacherId;
  if (day) params.day = day;
  if (period) params.period = period;
  if (room) params.room = room;

  const {
    isPending: isTimetablesLoading,
    error: timetablesError,
    data,
  } = useQuery({
    queryKey: ["timetables", page, limit, classId, teacherId, day, period, room],
    queryFn: () => getAllTimetablesApi(params),
  });

  const { timetables: rawTimetables, pagination } = data?.data || {};

  // Transform the nested backend structure to flat array
  const timetables = useMemo(() => {
    if (!rawTimetables || !Array.isArray(rawTimetables)) {
      return [];
    }
    return transformTimetableData(rawTimetables as TimetableBackendResponse[]);
  }, [rawTimetables]);

  return { timetables, pagination, isTimetablesLoading, timetablesError };
}

