"use client";
import { Fragment, useState, useEffect } from "react";
import DataTable from "./user/Data-Table";
import { columns } from "./user/columns";
import { getUserData, registerUserApi } from "./../apicalls/users.js";
import { Listbox, Transition } from "@headlessui/react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Transactions() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [isCorrect, setIsCorrect] = useState({
    sex: false,
    user: false,
  });

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
    password: z
      .string()
      .min(6, {
        message: "Password Must be at least 6 characters",
      })
      .max(20, {
        message: "Password must be between 6 to 20 characters.",
      }),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const registerUser = async (data) => {
    console.log(data);

    /// Preparing the data
    const user = {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    setLoading(true);

    // Making the API CALL request and dealing with results
    try {
      const response = await registerUserApi(user);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
          
        }, 500);
      } else {
        setTimeout(() => {
          console.log(response)
          toast.error(response.message);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error("AN ERROR OCCURED PLEASE TRY AGAIN!");
    }
    setLoading(false)
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <section className="py-12 px-10 w-full">
      <div className="flex justify-between items-center p-4">
        <p className="text-xl font-bold">ALL USERS</p>
        <Dialog>
          <DialogTrigger>
            <span className="bg-[#360670] text-white px-5 py-2 text-xl font-medium rounded-lg">
              ADD USER
            </span>
          </DialogTrigger>
          <DialogContent>
            <Form>
              <h4 className="text-center text-3xl font-medium">
                Register User
              </h4>
              <form onSubmit={handleSubmit(registerUser)} className="space-y-8">
                <FormItem>
                  <FormControl>
                    <Input {...register("fullname")} placeholder="Full Name" />
                  </FormControl>
                  {errors.fullname && (
                    <p className="text-red-600">{errors.fullname.message}</p>
                  )}
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Input {...register("username")} placeholder="User Name" />
                  </FormControl>
                  {errors.username && (
                    <p className="text-red-600">{errors.username.message}</p>
                  )}
                </FormItem>

                <FormItem>
                  <FormControl>
                    <Input {...register("email")} placeholder="Email" />
                  </FormControl>
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Input {...register("phone")} placeholder="Phone" />
                  </FormControl>
                  {errors.phone && (
                    <p className="text-red-600">{errors.phone.message}</p>
                  )}
                </FormItem>
                

                <FormItem>
                  <FormControl>
                    <Input {...register("password")} placeholder="Password" />
                  </FormControl>
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </FormItem>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {/* TABLE */}
      <DataTable columns={columns} data={users} />
    </section>
  );
}

export default Transactions;
