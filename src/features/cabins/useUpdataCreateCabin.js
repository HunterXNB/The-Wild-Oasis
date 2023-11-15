import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useUpdateCreateCabin(editId, reset, onClose) {
    const queryClient = useQueryClient();
    const { mutate: updateCreateCabin, isLoading } = useMutation({
        mutationFn: editId ? updateCabin : createCabin,
        onSuccess: () => {
            toast.success(
                editId ? "Cabin edited successfully." : "Cabin created successfully."
            );
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
            if (!editId && reset) reset();
            onClose?.()
        },
        onError: (err) =>
            toast(editId ? "Couldn't edit the cabin" : "Couldn't create the cabin"),
    });
    return { updateCreateCabin, isLoading }
}
export default useUpdateCreateCabin