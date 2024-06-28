"use client";
import {
  ArrowUpDown,
  MoreHorizontal,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Row Selection
import { Checkbox } from "@/components/ui/checkbox";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="font-bold text-lg">Full Name</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="font-bold text-lg">User Name</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-lg">Email</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="font-bold text-lg">Phone Number</div>,
  },
  {
    accessorKey: "sex",
    header: () => <div className="font-bold text-lg">Sex</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-bold text-lg">Created Time</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="font-bold text-lg">Status</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => {
      const cell = row.getValue("status");
      let status = {};
      cell === "active"
        ? (status = {
            isActive: true,
            icon: UserRoundCheck,
            text: "Active",
          })
        : (status = {
            isActive: false,
            icon: UserRoundX,
            text: "In Active",
          });

      return (
        <div className={`font-semibold `}>
          {status.isActive ? (
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white rounded-full p-1 font-black">
                <status.icon />
              </span>
              <span className="text-green-500">{status.text}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-white rounded-full p-1 font-black">
                <status.icon />
              </span>
              <span className="text-red-500">{status.text}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="flex flex-col gap-2 p-2 text-sm font-semibold">
              {/* <p onClick={() => navigator.clipboard.writeText(user.id)}>
                <ChangeUserPassword user={user} />
              </p> */}
              <p>
                <UpdateUser user={user} />
              </p>
              <p>
                <DeleteUser user={user} />
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
