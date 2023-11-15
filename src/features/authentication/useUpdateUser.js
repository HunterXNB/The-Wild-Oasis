import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { da } from "date-fns/locale";

export default function useUpdateUser() {
    const queryClient = useQueryClient()
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success(`User's data updated successfully.`)
            queryClient.setQueryData(["user"], user)
            // queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    return { updateUser, isUpdating }
}