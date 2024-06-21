"use client";
import { Fragment, useState, useEffect } from "react";
import DataTable from "./tank/Data-Table";
import { columns } from "./tank/columns";
import {
  getTanksData,
  registerTanksApi,
  updateTanksApi,
} from "../apicalls/tanks.js";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Tanks() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tanks, setTanks] = useState([]);

  // const {
  //   register,
  //   handleSubmit,

  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(formSchema),
  // });

  // const registerTank = async (data) => {
  //   /// Preparing the data
  //   const tank = {
  //     quantity: data.quantity,
  //     desc: data.description,
  //   };
  //   setLoading(true);

  //   // Making the API CALL request and dealing with results
  //   try {
  //     const response = await registerTanksApi(tank);

  //     if (response.success) {
  //       setTimeout(() => {
  //         toast.success(response.message);
  //       }, 500);
  //     } else {
  //       setTimeout(() => {
  //         console.log(response);
  //         toast.error(response.message);
  //       }, 500);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error.message);
  //     toast.error("AN ERROR OCCURED PLEASE TRY AGAIN!");
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTanksData();
      setTanks(data.data);
    };
    fetchData();
  }, []);

  // const formSchema = z.object({
  //   quantity: z
  //     .string()
  //     .refine((value) => !isNaN(parseFloat(value)), {
  //       message: "Must be a number",
  //     })
  //     .transform((value) => parseFloat(value))
  //     .refine((value) => value > 0, {
  //       message: "Enter Litres greater than zero",
  //     }),
  //   description: z.string().nonempty({
  //     message: "Description is a required field",
  //   }),
  // });

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
    // defaultValues: {
    //   quantity: tank.quantity,
    //   description: tank.desc,
    // },
  });

  const updateTank = async (data) => {
    /// Preparing the data
    const id = 1;
    const tank = {
      quantity: data.quantity,
      desc: data.description,
      refill: true,
    };
    setLoading(true);

    // Making the API CALL request and dealing with results
    try {
      const response = await updateTanksApi(tank, id);

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
    <section className="py-12 px-10 w-full">
      <div className="flex justify-between items-center p-4">
        <p className="text-xl font-bold">Tank Level Controller</p>
        <Dialog>
          <DialogTrigger>
            <span className="bg-[#360670] text-white px-5 py-2 text-xl font-medium rounded-lg">
              Refill
            </span>
          </DialogTrigger>
          <DialogContent>
            <Form>
              <h4 className="text-center text-xl font-medium">Refill Tank</h4>
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
                <div className="text-center">
                  <Button type="submit ">Refill</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {/* TABLE */}
      <DataTable columns={columns} data={tanks} />
    </section>
  );
}

export default Tanks;
