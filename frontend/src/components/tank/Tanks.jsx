import { useState, useEffect } from "react";
import DataTable from "./Data-Table";
import { columns } from "./columns";
import { getTanksData, updateTanksApi } from "@/apicalls/tanks";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      .string().min(1,{message:"Minimum quantity is 0.5 Ltr"})
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
        navigate("/home");
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
    <section className="py-4 px-10 w-full">
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center">
          <span className="text-3xl font-bold">Tank Level Controller</span>
        </div>
        <Dialog>
          <DialogTrigger>
            {/* <span className="bg-[#360670] text-white px-5 py-2 text-xl font-medium rounded-lg">
              Refill
            </span> */}
            <div className="bg-dark-blue text-white rounded-full p-2 flex items-center gap-2 px-4 text-xl font-semibold">
              <Plus />
              Refill
            </div>
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
                  {errors.quantity && (
                    <p className="text-red-600 pt-2">{errors.quantity.message}</p>
                  )}
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Input
                      {...register("description")}
                      placeholder="Description..."
                    />
                  </FormControl>
                  {errors.description && (
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
