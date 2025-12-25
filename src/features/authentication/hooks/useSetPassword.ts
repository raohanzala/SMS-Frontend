import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setPasswordApi } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/slices/authSlice';
import { toastError, toastSuccess } from '@/utils/helpers';

export function useSetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const roleRoutes: Record<string, string> = {
    school_owner: '/admin/dashboard',
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
    parent: '/parent/dashboard',
  };

  const { mutate: setPasswordMutation, isPending: isSetPasswordPending } = useMutation({
    mutationFn: setPasswordApi,
    onSuccess: (data) => {
      toastSuccess(data.message || 'Password set successfully. Your account is now active.');
      
      // Set credentials in Redux store (matching login flow structure)
      dispatch(setCredentials(data.data));

      // Redirect based on user role
      const userRole = data.data.user?.role as string;
      const redirectPath = roleRoutes[userRole] || '/login';
      navigate(redirectPath);
    },
    onError: (err) => {
      toastError(err, 'Failed to set password. Please try again.');
    },
  });

  return { setPasswordMutation, isSetPasswordPending };
}

