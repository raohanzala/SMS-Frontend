import { getTimetableByIdApi } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useTimetableById() {
	const { timetableId } = useParams();
  const {
    data,
    isPending: isTimetableLoading,
    error: timetableError,
  } = useQuery({
    queryKey: ["timetable", timetableId],
    queryFn: () => getTimetableByIdApi(timetableId!),
    enabled: !!timetableId,
  });

  const timetable = data?.data?.timetable;

  return { timetable, isTimetableLoading, timetableError };
}

