import { DeleteUserApi } from "@/apicalls/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckIcon, Trash2 } from "lucide-react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { AlertDescription } from "../ui/alert";
import { Listbox, Transition } from "@headlessui/react";

function Change(props) {
  const deleteUser = async () => {

    // Making the API CALL request and dealing with results
    try {
      const response = await DeleteUserApi(props.user);

      if (response.success) {
        setTimeout(() => {
          toast.success(response.message);
        }, 500);

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
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className="flex gap-2">
          <span className="text-red-600">
            <Trash2 />
          </span>
          <span className="">Delete</span>
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={`text-red-500`}>
            Change Status 
          </AlertDialogTitle>
          <AlertDescription>
             {/* SELECT SEX COMPONENT */}

             <FormItem>
              <FormLabel className="flex items-center mb-2 ml-1">
                <Asterisk color="#C40C0C"></Asterisk>
                <span>Sex</span>
              </FormLabel>
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
              {/* {isCorrect.sex && (
                <p className="text-red-600">{"Please select sex..."}</p>
              )} */}
            </FormItem>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={change}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ChangeStatus;
