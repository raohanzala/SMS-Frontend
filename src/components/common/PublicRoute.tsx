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

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // If user is authenticated, redirect to their dashboard
  if (isAuthenticated && user) {
    const roleRoutes: Record<UserRole, string> = {
      super_admin: '/admin/dashboard',
      school_owner: '/admin/dashboard',
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
      parent: '/parent/dashboard',
      staff: '/admin/dashboardd',
    };

    const redirectPath = roleRoutes[user.role as UserRole] || '/admin/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // If not authenticated, show the public page
  return <>{children}</>;
};

export default PublicRoute;

