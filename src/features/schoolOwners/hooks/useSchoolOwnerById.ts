import { useQuery } from '@tanstack/react-query';
import { getSchoolOwnerByIdApi } from '@/api/schoolOwners';

export function useSchoolOwnerById(ownerId: string | undefined) {
  const {
    data,
    isPending: isSchoolOwnerLoading,
    error: schoolOwnerError,
  } = useQuery({
    queryKey: ['schoolOwner', ownerId],
    queryFn: () => getSchoolOwnerByIdApi(ownerId!),
    enabled: !!ownerId,
  });

  const owner = data?.data;
  
  return { 
    owner, 
    isSchoolOwnerLoading, 
    schoolOwnerError 
  };
}

