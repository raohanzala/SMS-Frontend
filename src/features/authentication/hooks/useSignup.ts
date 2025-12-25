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
                data.message || "Account successfully created! Please verufy the new account from the user's email address."
            );
            dispatch(setCredentials(data.data))
            navigate('/onboarding/create-school')
        },
        onError: (err) => {
            toastError(
                err || "Failed to create account. Please try again."
            );
        }
    });

    return { signupMutation, isSignupPending };
}