import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signinApi } from '../../../api/auth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../store/slices/authSlice';
import { RootState } from '../../../store/store';

export function useLogin() {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const roleRoutes = {
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
    parent: '/parent/dashboard',
  };

  const { mutate: loginMutation, isPending: isLoginPending } = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      dispatch(setCredentials(data.data))

      if (data.isFirstLogin && data.data.user.role !== 'admin') {
        navigate('/change-password');
        return;
      }

      const redirectPath = roleRoutes[user?.role] || '/login';
      navigate(redirectPath)
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error(err.message || 'Provided email or password are incorrect');
    },
  });

  return { loginMutation, isLoginPending };
}