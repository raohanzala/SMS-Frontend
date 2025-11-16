import { getClassTimetable } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";

export function useClassTimetable(classId: string | null) {
  const {
    isPending: isClassTimetableLoading,
    error: classTimetableError,
    data,
  } = useQuery({
    queryKey: ["classTimetable", classId],
    queryFn: () => getClassTimetable(classId!),
    enabled: !!classId,
  });

  const classTimetable = data?.data;
  return { classTimetable, isClassTimetableLoading, classTimetableError };
}

