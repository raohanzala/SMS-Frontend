import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getParentByIdApi } from "@/api/parents";

export function useParent() {
  const { parentId } = useParams();

  const { isPending : isParentLoading, error: parentError, data } = useQuery({
    queryKey: ["parents", parentId],
    queryFn: () => getParentByIdApi(parentId as string),
    enabled: !!parentId,
  });

  return { parent: data?.data, isParentLoading, parentError };
}
  