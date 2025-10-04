import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getParentById } from "@/api/parents";

export function useParent() {
  const { parentId } = useParams(); // get `id` from URL

  console.log(parentId)
  const { isPending, error, data } = useQuery({
    queryKey: ["parents", parentId],
    queryFn: () => getParentById(parentId), // pass id to API function
    enabled: !!parentId, // only fetch if id exists
    keepPreviousData: true,
  });

  return { parent: data?.data, isPending, error };
}
