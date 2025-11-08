import { useQuery } from "@tanstack/react-query";
import { getClassesForAttendanceApi } from "@/api/attendance";
import { ClassForAttendance } from "../types/attendance.types";

export const useClassesForAttendance = () => {
  const {
    data,
    isLoading: isClassesLoading,
    error: classesError,
  } = useQuery<{
    success: boolean;
    message: string;
    data: ClassForAttendance[];
  }>({
    queryKey: ["classesForAttendance"],
    queryFn: getClassesForAttendanceApi,
  });

  return {
    classes: data?.data || [],
    isClassesLoading,
    classesError: classesError as Error | null,
  };
};

