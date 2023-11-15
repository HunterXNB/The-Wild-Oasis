import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
import { da } from "date-fns/locale";

export default function useDeleteBooking(id) {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: DeleteBooking } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
            toast.success(`Booking ${id} deleted successfully.`);
        },
        onError: (err) => toast.error(`Failed to delete booking ${id}`),
    });
    return { DeleteBooking, isDeleting }
}