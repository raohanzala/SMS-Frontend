import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { SettingsProvider } from "./contexts/SettingsContext";
import ProtectedRoute from "@/guards/ProtectedRoute";
import RoleGuard from "@/guards/RoleGuard";
import AdminRoutes from "./routes/AdminRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import OwnerRoutes from "./routes/OwnerRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ParentRoutes from "./routes/ParentRoutes";
import StaffRoutes from "./routes/StaffRoutes";
import { PublicRoute } from "./routes/PublicRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import LoginPage from "./features/authentication/pages/LoginPage";
import SignupPage from "./features/authentication/pages/SignupPage";
import ForgotPasswordPage from "./features/authentication/pages/ForgotPasswordPage";
import ChangePasswordPage from "./features/authentication/pages/ChangePasswordPage";
import SetPasswordPage from "./features/authentication/pages/SetPasswordPage";
import PublicLayout from "./components/layout/PublicLayout";
import CreateSchoolPage from "./features/onboarding/pages/CreateSchoolPage";
import PlansListingPage from "./features/plans/pages/PlansListingPage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/"  element={<PublicRoutes />}>
                <Route element={<PublicLayout />}>
                <Route index element={<Navigate to="/login" replace />} />
                  <Route
                    path="/plans"
                    element={
                      <PublicRoute>
                        <PlansListingPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <SignupPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <PublicRoute>
                        <ForgotPasswordPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/change-password"
                    element={
                      <PublicRoute>
                        <ChangePasswordPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/set-password"
                    element={
                      <PublicRoute>
                        <SetPasswordPage />
                      </PublicRoute>
                    }
                  />
                  {/* <Route
                    path="/onboarding/create-school"
                    element={
                      <PublicRoute>
                        <CreateSchoolPage />
                      </PublicRoute>
                    }
                  /> */}
                </Route>
              </Route>

              {/* Protected */}
              <Route element={<ProtectedRoute />}>
              <Route element={<RoleGuard allowedRoles={["school_owner"]} />}>
                <Route path="/onboarding/create-school" element={<CreateSchoolPage />} />
              </Route>

                {/* Super Admin */}
                <Route element={<RoleGuard allowedRoles={["super_admin"]} />}>
                  <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
                </Route>

                {/* Owner */}
                <Route element={<RoleGuard allowedRoles={["school_owner"]} />}>
                  <Route path="/owner/*" element={<OwnerRoutes />} />
                </Route>

                {/* Admin */}
                <Route element={<RoleGuard allowedRoles={["admin"]} />}>
                  <Route path="/admin/*" element={<AdminRoutes />} />
                </Route>

                {/* Teacher */}
                <Route element={<RoleGuard allowedRoles={["teacher"]} />}>
                  <Route path="/teacher/*" element={<TeacherRoutes />} />
                </Route>

                {/* Student */}
                <Route element={<RoleGuard allowedRoles={["student"]} />}>
                  <Route path="/student/*" element={<StudentRoutes />} />
                </Route>

                {/* Parent */}
                <Route element={<RoleGuard allowedRoles={["parent"]} />}>
                  <Route path="/parent/*" element={<ParentRoutes />} />
                </Route>

                {/* Staff */}
                <Route element={<RoleGuard allowedRoles={["staff"]} />}>
                  <Route path="/staff/*" element={<StaffRoutes />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SettingsProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
