import Button from "../../ui/Button";
import useCheckout from "./useCheckout";
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();
  return (
    <Button
      onClick={() => checkout(bookingId)}
      disabled={isCheckingout}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
