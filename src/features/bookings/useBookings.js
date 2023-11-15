import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export default function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get("status")
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
    const [field, direction] = sortByRaw.split("-")
    const sortBy = { field, direction }
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue }
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const { data: { data: bookings, count } = {}, isLoading, error } = useQuery({ queryKey: ["bookings", filter, sortBy, page], queryFn: () => getBookings({ filter, sortBy, page }) })
    const PageCount = Math.ceil(count / PAGE_SIZE)
    if (page < PageCount) {
        queryClient.prefetchQuery({

            queryKey: ["bookings", filter, sortBy, page + 1], queryFn: () => getBookings({ filter, sortBy, page: page + 1 })

        })
    }
    if (page > 1) {
        queryClient.prefetchQuery({

            queryKey: ["bookings", filter, sortBy, page - 1], queryFn: () => getBookings({ filter, sortBy, page: page - 1 })

        })
    }
    return { bookings, error, isLoading, count }
}
