import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student' | 'parent' | 'school_owner';

interface User {
  role: UserRole;
  [key: string]: string | number | boolean | null | undefined;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface RootState {
  auth: AuthState;
}

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { user, isAuthenticated} = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role as UserRole)) {
    const roleRoutes: Record<UserRole, string> = {
      super_admin: '/super-admin/dashboard',
      school_owner: '/school-owner/dashboard',
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
      parent: '/parent/dashboard',
      staff: '/admin/dashboard',
    };

    const redirectPath = roleRoutes[user?.role as UserRole] || '/login';
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedRoute;

