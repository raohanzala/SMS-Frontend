import { useQuery } from "@tanstack/react-query";
import { getAllCampusesApi } from "@/api/campuses";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function useCampuses() {

  const {user} = useSelector((state: RootState) => state.auth)
  const {
    isPending: isCampusesLoading,
    error: campusesError,
    data,
  } = useQuery({
    queryKey: ["campuses"],
    queryFn: getAllCampusesApi,
    enabled: user?.role === 'school_owner',
  });

  const campuses = data?.data || [];

  return { campuses, isCampusesLoading, campusesError };
}

