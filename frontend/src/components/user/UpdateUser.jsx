"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CheckIcon, ChevronsUpDownIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUserApi } from "@/apicalls/users";

const sex = [
  {
    id: 1,
    name: "Select Sex",
  },
  {
    id: 2,
    name: "male",
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-young-man-white-shirt-tie-with-glasses_1142-43199.jpg?t=st=1715407192~exp=1715410792~hmac=b20261ab39f9f7e802c0cf3a1c0a5824701b95a68cab3ebb759902f60590c4d8&w=740",
  },
  {
    id: 3,
    name: "female",
    avatar:
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611759.jpg?t=st=1715407545~exp=1715411145~hmac=d3644d1e8a07ae9ddddc2ce0198553f2cbc565e422f8a1f577f896cc1f5cc03d&w=740",
  },
];
const user = [
  {
    id: 1,
    name: "Select User Type",
  },
  {
    id: 2,
    name: "Admin",
  },
  {
    id: 3,
    name: "User",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DialogModal(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(
    props?.user?.sex == "male" ? sex[1] : sex[2]
  );
  const [selectedUser, setSelectedUser] = useState(
    props?.user?.userType == "admin" ? user[1] : user[2]
  );

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
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: props.user.fullname,
      username: props.user.username,
      email: props.user.email,
      phone: props.user.phone,
    },
  });

  const updateUser = async (data) => {
    const updatedIsCorrect = {
      sex: selected.name == "Select Sex" ? true : false,
      user: selectedUser.name === "Select User Type" ? true : false,
    };

    setIsCorrect(updatedIsCorrect);

    /// Preparing the data
    const user = {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
      sex: selected.name.toLowerCase(),
      userType: selectedUser.name.toLowerCase(),
    };
    setLoading(true);

    // Making the API CALL request and dealing with results
    try {
      const response = await updateUserApi(user,props?.user?.id);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
        }, 500);
        reset({
          fullname: "", // You can reset to empty or to initial props if needed
          username: "",
          email: "",
          phone: "",
        });

        // Resetting custom state for Listbox components
        setSelected(sex[0]); // Assuming sex[0] is the initial 'Select Sex' state
        setSelectedUser(user[0]); // Assuming user[0] is the initial 'Select User Type' state
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
              <Pencil />
            </span>
            <span className="">Update</span>
          </p>
        </DialogTrigger>
        <DialogContent>
          <Form>
            <h4 className="text-center text-3xl font-medium">Update User</h4>
            <form onSubmit={handleSubmit(updateUser)} className="space-y-8">
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
              {/* SELECT SEX COMPONENT */}

              <FormItem>
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <img
                              src={selected.avatar}
                              alt=""
                              className="h-5 w-5 flex-shrink-0 rounded-full"
                            />
                            <span className="ml-3 block truncate">
                              {selected?.name}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronsUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {sex.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <img
                                        src={person.avatar}
                                        alt=""
                                        className="h-5 w-5 flex-shrink-0 rounded-full"
                                      />
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {person.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
                {isCorrect.sex && (
                  <p className="text-red-600">{"Please select sex..."}</p>
                )}
              </FormItem>
              {/* SELECT USERTYPE COMPONENT */}

              <FormItem>
                <Listbox value={selectedUser} onChange={setSelectedUser}>
                  {({ open }) => (
                    <>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="ml-3 block truncate">
                              {selectedUser?.name}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronsUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {user.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <img
                                        src={person.avatar}
                                        alt=""
                                        className="h-5 w-5 flex-shrink-0 rounded-full"
                                      />
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {person.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
                {isCorrect.user && (
                  <p className="text-red-600">{"Please select user..."}</p>
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

export default DialogModal;
