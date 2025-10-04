import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signin } from '@/api/auth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';

export function useLogin() {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const roleRoutes = {
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
    parent: '/parent/dashboard',
  };

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => signin({ email, password }),
    onSuccess: (data) => {

      // Redux store update
      queryClient.setQueryData(['user'], data.user);
      dispatch(setCredentials(data.data))

      console.log(data)
      // First login check
      if (data.isFirstLogin && data.data.user.role !== 'admin') {
        navigate('/change-password');
        return;
      }

      const redirectPath = roleRoutes[user?.role] || '/login';
      navigate(redirectPath)
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error(err?.response?.data?.message || 'Provided email or password are incorrect');
    },
  });

  return { login, isPending };
}