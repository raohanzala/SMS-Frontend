import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../store/slices/authSlice";
import { createSchoolApi } from "@/api/schools";
import { toastError, toastSuccess } from "@/utils/helpers";

export function useCreateSchool() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: createSchoolMutation, isPending: isCreatingSchool } = useMutation({
    mutationFn: createSchoolApi,
    onSuccess: (data) => {
      toastSuccess(data.message || "School created successfully!");
      
      // Update credentials with new token that includes schoolId
      if (data.data?.token) {
        dispatch(setCredentials(data.data));
      }
      
      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    },
    onError: (err) => {
     toastError(
        err || "Failed to create school. Please try again."
      );
    },
  });

  return { createSchoolMutation, isCreatingSchool };
}

