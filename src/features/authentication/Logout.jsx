import React from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
export default function Logout() {
  const { logout, isLoggingout } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingout} onClick={logout}>
      {!isLoggingout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
