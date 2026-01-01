import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { signupApi } from "@/api/auth";
import { toastError, toastSuccess } from "@/utils/helpers";

export function useSignup() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { mutate: signupMutation, isPending: isSignupPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            toastSuccess(
                data.message || "Account successfully created! Please verify the new account from the user's email address."
            );
            // Set credentials first, then navigate
            // The PublicRoutes will check if school exists and redirect accordingly
            dispatch(setCredentials(data.data));
            // Navigate to create school page - PublicRoutes will handle redirect if needed
            navigate('/onboarding/create-school', { replace: true });
        },
        onError: (err) => {
            toastError(
                err || "Failed to create account. Please try again."
            );
        }
    });

    return { signupMutation, isSignupPending };
}