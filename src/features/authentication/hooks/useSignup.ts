import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../store/slices/authSlice";
import { RootState } from "../../../store/store";
import { signupApi } from "@/api/auth";
type Role = 'admin' | 'teacher' | 'student' | 'parent';

export function useSignup() {
    const { user } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const roleRoutes: Record<Role, string> = {
    //     admin: '/admin/dashboard',
    //     teacher: '/teacher/dashboard',
    //     student: '/student/dashboard',
    //     parent: '/parent/dashboard',
    // };

    const { mutate: signupMutation, isPending: isSignupPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            toast.success(
                data.message || "Account successfully created! Please verufy the new account from the user's email address."
            );
            dispatch(setCredentials(data.data))
            // const redirectPath = roleRoutes[user?.role as Role] || '/login';
            navigate('/onboarding/create-school')
        },
        onError: (err) => {
            toast.error(
                err.message || "Failed to create account. Please try again."
            );
        }
    });

    return { signupMutation, isSignupPending };
}