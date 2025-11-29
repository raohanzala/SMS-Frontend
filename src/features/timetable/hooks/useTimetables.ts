import { getAllTimetablesApi } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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

  const { timetables, pagination } = data?.data || {};
  return { timetables, pagination, isTimetablesLoading, timetablesError };
}

