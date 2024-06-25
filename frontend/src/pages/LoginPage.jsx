import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// import { useAuth } from "@/AuthProvider";
import {
  deleteActiveUser,
  loginUserApi,
  registerActiveUser,
} from "@/apicalls/users";

import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  checkSession,
  loginUser,
  logoutUser,
} from "@/redux/features/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    username: z.string().nonempty({
      message: "Username required. Please enter your username.",
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

  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) {
        await deleteActiveUser();
      } else {
        navigate("/home");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogin = async (data) => {
    const formData = {
      username: data.username,
      password: data.password,
    };
    setLoading(true);

    const response = await loginUserApi(formData);

    if (response.success) {
      const user = {
        username: response?.username,
        expiresIn: response?.expiresIn,
        token: response?.token,
      };

      dispatch(loginUser(user));
      navigate("/home");
      toast.success("LOGGED IN SUCCESSFULLY!");
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-between">
      <div className="bg-[#1b265b] w-1/2 hidden sm:flex justify-center items-center">
        <img src="./ishub.png" alt="" />
      </div>
      <div className="w-full sm:w-1/2 flex justify-center items-center">
        {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    */}
        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <div className="flex items-center justify-start">
              <img
                className="w-16 h-16 mx-auto"
                src="android-chrome-512x512.png"
                alt="Your Company"
              />
              <span>Iishub Caano</span>
            </div> */}
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome Back!
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form>
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit(handleLogin)}
              >
                <FormItem>
                  <div className="mb-2">
                    <FormLabel>Username</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      className="text-base"
                      {...register("username")}
                      type="text"
                      placeholder="e.g. John Doe"
                    />
                  </FormControl>
                  {errors.username && (
                    <p className="text-red-600 pt-2 pl-3">
                      {errors.username.message}
                    </p>
                  )}
                </FormItem>
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="my-2">Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      className="text-base"
                      {...register("password")}
                      type="password"
                      placeholder="****"
                    />
                  </FormControl>
                  {errors.password && (
                    <p className="text-red-700 pt-2">
                      {errors.password.message}
                    </p>
                  )}
                </FormItem>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-dark-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-dark-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? "Login..." : "Login"}
                  </button>
                </div>
              </form>
            </Form>

            {/* <p className="mt-10 text-center text-sm text-gray-500">
            Don't have?{" "}
            <a
              href="#demo"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
