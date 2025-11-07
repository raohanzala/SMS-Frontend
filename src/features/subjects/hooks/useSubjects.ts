import { getAllSubjectsApi } from "@/api/subjects";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useSubjects(isAll = false) {
  const [searchParams] = useSearchParams();

  const page = isAll ? 1 : Number(searchParams.get("page")) || 1;
  const limit = 10;
  const search = searchParams.get("subject") || "";

  const {
    isPending: isSubjectsLoading,
    error: subjectsError,
    data,
  } = useQuery({
    queryKey: ["subjects", page, limit, search],
    queryFn: () => getAllSubjectsApi({ page, limit, search }),
  });

  const { classes : subjectsWithClass, pagination } = data?.data || {};

  return { subjectsWithClass, pagination, isSubjectsLoading, subjectsError };
}

