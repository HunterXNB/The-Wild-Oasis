import { useQuery } from "@tanstack/react-query";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useEditSetting from "./useEditSettings";

function UpdateSettingsForm() {
  const { settings, isLoading, error } = useSettings();
  const { editSetting, isEditing } = useEditSetting();

  if (isLoading) return <Spinner />;
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;
  function handleUpdate(e, name) {
    if (settings[name] != e.target.value) {
      editSetting({
        [name]: e.target.value,
      });
    }
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          defaultValue={minBookingLength}
          type="number"
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
