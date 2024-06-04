"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  EditIcon,
  Milk,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateTanksApi } from "@/apicalls/tanks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DialogModal(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isRefill = props.refill;

  const formSchema = z.object({
    quantity: z
      .string()
      .refine((value) => !isNaN(parseFloat(value)), {
        message: "Must be a number",
      })
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, {
        message: "Enter Litres greater than zero",
      }),
    description: z.string().nonempty({
      message: "Description is a required field",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: props.tank.quantity,
      description: props.tank.desc,
    },
  });

  const updateTank = async (data) => {
    /// Preparing the data
    const tank = {
      quantity: data.quantity,
      desc: data.description,
      refill: isRefill,
    };
    setLoading(true);

    // Making the API CALL request and dealing with results
    try {
      const response = await updateTanksApi(tank, props?.tank?.id);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
        }, 500);
        reset({
          quantity: "", // You can reset to empty or to initial props if needed
          description: "",
        });
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
            <span
              className={`${isRefill ? "text-slate-600" : "text-blue-700"} `}
            >
              {isRefill ? <Milk /> : <EditIcon />}
            </span>
            <span className="">{isRefill ? "Refill" : "Edit"}</span>
          </p>
        </DialogTrigger>
        <DialogContent>
          <Form>
            <h4 className="text-center text-3xl font-medium">UPDATE TANK</h4>
            <form onSubmit={handleSubmit(updateTank)} className="space-y-8">
              <FormItem>
                <FormControl>
                  <Input
                    {...register("quantity")}
                    placeholder="Enter Amount..."
                  />
                </FormControl>
                {errors.fullname && (
                  <p className="text-red-600">{errors.quantity.message}</p>
                )}
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    {...register("description")}
                    placeholder="Description..."
                  />
                </FormControl>
                {errors.username && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}
              </FormItem>
              <Button type="submit">ADD</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogModal;
