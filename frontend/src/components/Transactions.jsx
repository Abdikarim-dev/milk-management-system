"use client";
import { Fragment, useState, useEffect } from "react";
import DataTable from "./transaction/Data-Table";
import { columns } from "./transaction/columns";
import { Listbox, Transition } from "@headlessui/react";

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
import { useSelector } from "react-redux";
import { RegisterTransaction, getSpecificTransactions } from "@/apicalls/transactions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AMOUNT_PER_DHUCEY = 15000;
const transactionInfo = [
  {
    id: 0,
    name: "Maxaan kaa beecinaa",
    litre: "Select Amount of Litre",
    price: 0,
  },
  {
    id: 1,
    name: "Dhuceey",
    litre: 500,
    price: AMOUNT_PER_DHUCEY * 1,
  },
  {
    id: 2,
    name: "Dhalo",
    litre: 1000,
    price: AMOUNT_PER_DHUCEY * 2,
  },
  {
    id: 3,
    name: "Dhalo Iyo Dhucey",
    litre: 1500,
    price: AMOUNT_PER_DHUCEY * 3,
  },
  {
    id: 4,
    name: "2 Dhalo",
    litre: 2000,
    price: AMOUNT_PER_DHUCEY * 4,
  },
  {
    id: 5,
    name: "2 Dhalo Iyo Dhucey",
    litre: 2500,
    price: AMOUNT_PER_DHUCEY * 5,
  },
  {
    id: 6,
    name: "3 Dhalo",
    litre: 3000,
    price: AMOUNT_PER_DHUCEY * 6,
  },
  {
    id: 7,
    name: "3 Dhalo Iyo Dhucey",
    litre: 3500,
    price: AMOUNT_PER_DHUCEY * 7,
  },
  {
    id: 8,
    name: "4 Dhalo",
    litre: 4000,
    price: AMOUNT_PER_DHUCEY * 8,
  },
  {
    id: 9,
    name: "4 Dhalo Iyo Dhucey",
    litre: 4500,
    price: AMOUNT_PER_DHUCEY * 9,
  },
  {
    id: 10,
    name: "5 Dhalo",
    litre: 5000,
    price: AMOUNT_PER_DHUCEY * 10,
  },
  {
    id: 11,
    name: "5 Dhalo Iyo Dhucey",
    litre: 5500,
    price: AMOUNT_PER_DHUCEY * 11,
  },
  {
    id: 12,
    name: "6 Dhalo",
    litre: 6000,
    price: AMOUNT_PER_DHUCEY * 12,
  },
  {
    id: 13,
    name: "6 Dhalo Iyo Dhucey",
    litre: 6500,
    price: AMOUNT_PER_DHUCEY * 13,
  },
  {
    id: 14,
    name: "7 Dhalo",
    litre: 7000,
    price: AMOUNT_PER_DHUCEY * 14,
  },
  {
    id: 15,
    name: "7 Dhalo Iyo Dhucey",
    litre: 7500,
    price: AMOUNT_PER_DHUCEY * 15,
  },
  {
    id: 16,
    name: "8 Dhalo",
    litre: 8000,
    price: AMOUNT_PER_DHUCEY * 16,
  },
  {
    id: 17,
    name: "8 Dhalo Iyo Dhucey",
    litre: 8500,
    price: AMOUNT_PER_DHUCEY * 17,
  },
  {
    id: 18,
    name: "9 Dhalo",
    litre: 9000,
    price: AMOUNT_PER_DHUCEY * 18,
  },
  {
    id: 19,
    name: "9 Dhalo Iyo Dhucey",
    litre: 9500,
    price: AMOUNT_PER_DHUCEY * 19,
  },
  {
    id: 20,
    name: "10 Dhalo",
    litre: 10000,
    price: AMOUNT_PER_DHUCEY * 20,
  },
];

function Transactions() {
  const [selectedInfo, setSelectedInfo] = useState(transactionInfo[0]);
  const { user } = useSelector((state) => state.user);
  // console.log(user)
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = async (e) => {
    e.preventDefault();
   

    /// Preparing the data
    const transaction = {
      litre: selectedInfo.litre,
      price: selectedInfo.price,
      userId: user?.id,
    };
    setLoading(true);

    // Making the API CALL request and dealing with results
    try {
      const response = await RegisterTransaction(transaction);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
        }, 500);
        navigate('/home')
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpecificTransactions(user?.id);

      // Function to reformat the array excluding specific properties
      const reformattedData = data?.map(
        ({ user: { createdAt, updatedAt, id, ...userRest }, ...rest }) => {
          return {
            ...rest, // Spread to include all other properties of the item
            ...userRest, // Spread to include all properties of the 'user' object, excluding the specified ones
          };
        }
      );
      setTransactions(reformattedData);
    };
    fetchData();
  }, []);
  return (
    <section className="py-12 px-10 w-full">
      <div className="flex justify-between items-center p-4">
        <p className="text-xl font-bold">ALL TRANSACTION</p>
        <Dialog>
          <DialogTrigger>
            <span className="bg-[#360670] text-white px-5 py-2 text-xl font-medium rounded-lg">
              Make Transaction
            </span>
          </DialogTrigger>
          <DialogContent>
            <Form>
              <h4 className="text-center text-3xl font-medium">
                Make Transaction
              </h4>
              <form onSubmit={addTransaction} className="space-y-8">
                {/* SELECT USERTYPE COMPONENT */}

                <FormItem>
                  <Listbox value={selectedInfo} onChange={setSelectedInfo}>
                    {({ open }) => (
                      <>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="ml-3 block truncate">
                                {selectedInfo.name}
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
                              {transactionInfo?.map((person) => (
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
                  {/* {isCorrect.user && (
                    <p className="text-red-600">{"Please select user..."}</p>
                  )} */}
                </FormItem>

                <FormItem>
                  <FormControl>
                    <Input value={selectedInfo.price} disabled placeholder="" />
                  </FormControl>
                  {/* {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )} */}
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Input value={user?.username} disabled />
                  </FormControl>
                  {/* {errors.fullname && (
                    <p className="text-red-600">{errors.fullname.message}</p>
                  )} */}
                </FormItem>
                <Button
                  disabled={
                    selectedInfo.litre === "Select Amount of Litre" ||
                    selectedInfo.price === 0
                  }
                  type="submit"
                >
                  {loading ? "Registering" : "Send"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {/* TABLE */}
      <DataTable columns={columns} data={transactions} />
    </section>
  );
}

export default Transactions;
