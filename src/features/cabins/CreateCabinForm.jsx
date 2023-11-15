import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useUpdateCreateCabin from "./useUpdataCreateCabin";

function CreateCabinForm({ cabinToEdit, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit || { id: false };
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: editId ? editValues : {},
  });

  const { updateCreateCabin, isLoading } = useUpdateCreateCabin(
    editId,
    reset,
    onClose
  );
  function onSubmit(data) {
    if (editId) {
      const changedValues = Object.fromEntries(
        Object.entries(data).filter((val) => val[1] != editValues[val[0]])
      );

      if (typeof changedValues.image === "object")
        changedValues.image = changedValues.image[0];
      else delete changedValues.image;
      updateCreateCabin({ id: editId, ...changedValues });
    } else {
      updateCreateCabin({ ...data, image: data.image[0] });
    }
  }

  return (
    <Form
      type={onClose ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow error={errors?.name?.message} label={"Cabin name"}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isLoading}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Price should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label={"Discount"}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required.",
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                "Discount should be less than the regular price."
              );
            },
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isLoading}
          type="number"
          {...register("description", {
            required: "This field is required.",
          })}
          id="description"
          defaultValue=""
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          disabled={isLoading}
          type="file"
          {...register(
            "image",
            editId || {
              required: "This fiel is required.",
            }
          )}
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" onClick={() => onClose?.()} type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {editId ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
