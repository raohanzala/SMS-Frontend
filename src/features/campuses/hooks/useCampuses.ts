import { useQuery } from "@tanstack/react-query";
import { getAllCampusesApi } from "@/api/campuses";

export function useCampuses() {
  const {
    isPending: isCampusesLoading,
    error: campusesError,
    data,
  } = useQuery({
    queryKey: ["campuses"],
    queryFn: () => getAllCampusesApi(),
  });

  const campuses = data?.data || [];

  return { campuses, isCampusesLoading, campusesError };
}

