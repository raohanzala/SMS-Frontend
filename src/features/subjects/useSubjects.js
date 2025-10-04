import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllSubjects } from "@/api/subjects";

export function useSubjects(isAll = false) {
  const [searchParams] = useSearchParams();

  const page = isAll ? 1 : (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const limit = 10;
  const search = searchParams.get("subject") || "";

  const { isPending, error, data } = useQuery({
    queryKey: ["subjects", page, limit, search],
    queryFn: () => getAllSubjects({ page, limit, search }),
    keepPreviousData: true,
  });

  const { subjects, pagination } = data?.data || {};
  console.log(data)

  return { subjects, pagination, isPending, error };

}