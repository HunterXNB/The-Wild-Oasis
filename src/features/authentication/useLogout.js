import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: logout, isLoading: isLoggingout } = useMutation({
        mutationFn: logoutApi, onSuccess: () => {
            navigate("/login", { replace: true })
            queryClient.removeQueries()
        }
    })
    return { logout, isLoggingout }
}