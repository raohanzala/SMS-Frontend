import { useMutation } from "@tanstack/react-query";
import { switchCampusApi } from "@/api/campuses";
import { toastSuccess, toastError } from "@/utils/helpers";
import { useDispatch } from "react-redux";
import { setCampus, setToken } from "@/store/slices/authSlice";

export function useSwitchCampus() {
  const dispatch = useDispatch();

  const { mutate: switchCampusMutation, isPending: isSwitchingCampus } = useMutation({
    mutationFn: (campusId: string) => switchCampusApi(campusId),
    onSuccess: (data) => {
      const { token, campus } = data.data;
			
			dispatch(setToken(token));
			dispatch(setCampus(campus));
      
      toastSuccess(`Switched to ${campus.name}`);
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (err) => {
      toastError(err, "Failed to switch campus");
    },
  });

  return { switchCampusMutation, isSwitchingCampus };
}

