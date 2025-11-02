import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export function useSignup() {
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const roleRoutes = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
        parent: '/parent/dashboard',
    };

    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            toast.success(
                data.message || "Account successfully created! Please verufy the new account from the user's email address."
            );
            dispatch(setCredentials(data.data))
            const redirectPath = roleRoutes[user?.role] || '/login';
            navigate(redirectPath)
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Account successfully created! Please verufy the new account from the user's email address."
            );
        }
    });

    return { signup, isPending };
}