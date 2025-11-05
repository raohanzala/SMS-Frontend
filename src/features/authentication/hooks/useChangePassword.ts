import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { changePasswordApi } from '@/api/auth';
import { toast } from 'react-toastify';

export function useChangePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()


  const { mutate: changePasswordMutation, isPending: isChangePasswordPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);

      const redirectPath = '/login';
      navigate(redirectPath)
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error(err?.response?.data?.message || 'Provided email or password are incorrect');
    },
  });

  return { changePasswordMutation, isChangePasswordPending };
}