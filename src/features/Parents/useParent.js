import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getParentById } from "@/api/parents";

export function useParent() {
  const { parentId } = useParams();

  console.log(parentId)
  const { isPending, error, data } = useQuery({
    queryKey: ["parents", parentId],
    queryFn: () => getParentById(parentId),
    enabled: !!parentId,
    keepPreviousData: true,
  });

  return { parent: data?.data, isPending, error };
}
