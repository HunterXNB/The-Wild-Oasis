import styled from "styled-components";
import Spinner from "../../ui/Spinner";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
import React from "react";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
export default function DashboardLayout() {
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { bookings, isLoading, numDays } = useRecentBookings();
  const { stays, confirmedStays, isLoading: staysIsLoading } = useRecentStays();
  if (isLoading || staysIsLoading || isLoadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        cabinCount={cabins.length}
        bookings={bookings}
        confirmedStays={confirmedStays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
