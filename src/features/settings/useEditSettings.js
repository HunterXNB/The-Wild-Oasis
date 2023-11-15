import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSetting() {
    const queryClient = useQueryClient()
    const { mutate: editSetting, isLoading: isEditing } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Settings updated successfully.")
            queryClient.invalidateQueries({ queryKey: ["settings"] })
        },
        onError: () => toast.error("Failed to update settings.")

    })
    return { isEditing, editSetting }

}
