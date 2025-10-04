import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { changePassword as changePasswordApi } from '@/api/auth';
import { toast } from 'react-toastify';

export function useChangePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()


  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (data) => {

      // Redux store update
      queryClient.setQueryData(['user'], data.user);

      console.log(data)
      // First login check
      // if (data.isFirstLogin) {
      //   navigate('/change-password');
      //   return;
      // }

      const redirectPath = '/login';
      navigate(redirectPath)
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error(err?.response?.data?.message || 'Provided email or password are incorrect');
    },
  });

  return { changePassword, isPending };
}