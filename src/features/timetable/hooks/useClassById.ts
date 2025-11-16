import { getClassByIdApi } from "@/api/classes";
import { useQuery } from "@tanstack/react-query";

export function useClassById(classId: string | null) {
  const {
    isPending: isClassLoading,
    error: classError,
    data,
  } = useQuery({
    queryKey: ["class", classId],
    queryFn: () => getClassByIdApi(classId!),
    enabled: !!classId,
  });

  const classData = data?.data;
  return { classData, isClassLoading, classError };
}

