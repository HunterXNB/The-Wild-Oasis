import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin({ id, name }) {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: DeleteCabin } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
            toast.success(`Cabin ${name} deleted successfully.`);
        },
        onError: (err) => toast.error(`Failed to delete cabin ${name}`),
    });
    return { DeleteCabin, isDeleting }
}