import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { changePassword } from "@/apicalls/users";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const schema = z
  .object({
    oldPassword: z
      .string()
      .min(3, { message: "Old Password must be at least 6 characters long" }),
    newPassword: z
      .string()
      .min(6, { message: "New Password must be at least 6 characters long" }),
    confirmNewPassword: z.string().min(6, {
      message: "Confirm New Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New Passwords do not match",
    path: ["confirmNewPassword"], // This targets the error specifically to the confirmNewPassword field
  });

function ChangePasswordForm() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (newData) => {
    setLoading(true);

    const newInfo = {
      oldPassword: newData.oldPassword,
      newPassword: newData.newPassword,
    };
    try {
      const response = await changePassword(newInfo, user.id);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
        }, 500);
        reset({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        setTimeout(() => {
          console.log(response);
          toast.error(response.message);
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("AN ERROR OCCURED PLEASE TRY AGAIN!");
    }
    setLoading(false);
  };

  return (
    <Form>
      <h4 className="text-center text-3xl font-medium pb-10">
        Change Password
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormItem>
          <FormControl>
            <Input
              type={"password"}
              {...register("oldPassword")}
              placeholder="Old Password"
            />
          </FormControl>
          {errors.oldPassword && (
            <p className="text-red-600">{errors.oldPassword.message}</p>
          )}
        </FormItem>
        <FormItem>
          <FormControl>
            <Input
              type={"password"}
              {...register("newPassword")}
              placeholder="New Password"
            />
          </FormControl>
          {errors.newPassword && (
            <p className="text-red-600">{errors.newPassword.message}</p>
          )}
        </FormItem>

        <FormItem>
          <FormControl>
            <Input
              type={"password"}
              {...register("confirmNewPassword")}
              placeholder="Confirm New Password"
            />
          </FormControl>
          {errors.confirmNewPassword && (
            <p className="text-red-600">{errors.confirmNewPassword.message}</p>
          )}
        </FormItem>
        <div className="text-right">
          <Button
            className={"bg-black px-5 py-2 rounded-lg text-white"}
            type="submit"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;
