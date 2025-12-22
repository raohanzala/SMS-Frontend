import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signinApi } from '../../../api/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/slices/authSlice';

export function useLogin() {
  const queryClient = useQueryClient();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const roleRoutes: Record<string, string> = {
    school_owner: '/admin/dashboard',
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
    parent: '/parent/dashboard',
  };

  const { mutate: loginMutation, isPending: isLoginPending } = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      console.log(data.data)
      dispatch(setCredentials(data.data))

      // if (data.isFirstLogin && data.data.user.role !== 'admin' && data.data.user.role !== 'school_owner') {
      //   navigate('/change-password');
      //   return;
      // }

      const userRole = data.data.user?.role as string;
      const redirectPath = roleRoutes[userRole] || '/login';
      navigate(redirectPath)
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error(err.message || 'Provided email or password are incorrect');
    },
  });

  return { loginMutation, isLoginPending };
}