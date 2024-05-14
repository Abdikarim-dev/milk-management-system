"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CheckIcon, ChevronsUpDownIcon, KeyRound, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUserApi } from "@/apicalls/users";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ChangeUserPassword(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    fullname: z.string().nonempty({
      message: "Name is a required field ,Write your name here",
    }),
    username: z.string().nonempty({
      message: "Username is a required field ,Write your username here",
    }),
    email: z
      .string()
      .nonempty({
        message: "Email is a required field ,Write your email here",
      })
      .email({
        message: "Please write a correct email",
      }),
    phone: z.string().nonempty({
      message: "Phone is a required field ,Write your Number here",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const ChangePassword = async (data) => {

    /// Preparing the data
    const user = {
      id: props?.user?.id,
      newPassword: data.newPassword,
      oldPassword:data.oldPassword,
    };
    setLoading(true);

    // Making the API CALL request and dealing with results
    try {
      const response = await updateUserApi(user);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
        }, 500);

        // Resetting custom state for Listbox components
      } else {
        setTimeout(() => {
          console.log(response);
          toast.error(response.message);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error("AN ERROR OCCURED PLEASE TRY AGAIN!");
    }
    setLoading(false);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <p className="flex gap-2">
            <span className="text-green-600">
              <KeyRound />
            </span>
            <span className="">Change Password</span>
          </p>
        </DialogTrigger>
        <DialogContent>
          <Form>
            <h4 className="text-center text-3xl font-medium">Change User Password</h4>
            <form onSubmit={handleSubmit(ChangePassword)} className="space-y-8">
              <FormItem>
                <FormControl>
                  <Input {...register("oldPassword")} placeholder="Enter the user's old password" />
                </FormControl>
                {errors.fullname && (
                  <p className="text-red-600">{errors.fullname.message}</p>
                )}
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input {...register("newPassword")} placeholder="Re-enter New Password" />
                </FormControl>
                {errors.username && (
                  <p className="text-red-600">{errors.username.message}</p>
                )}
              </FormItem>

              <FormItem>
                <FormControl>
                  <Input {...register("confirmNewPassword")} placeholder="Re-enter New Password" />
                </FormControl>
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </FormItem>
              <Button type="submit">
                {loading ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangeUserPassword;
