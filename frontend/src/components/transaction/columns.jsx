"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import ChangeUserPassword from "./user/ChangeUserPassword";

const sex = [
  {
    id: 1,
    name: "Select Sex",
  },
  {
    id: 2,
    name: "Male",
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-young-man-white-shirt-tie-with-glasses_1142-43199.jpg?t=st=1715407192~exp=1715410792~hmac=b20261ab39f9f7e802c0cf3a1c0a5824701b95a68cab3ebb759902f60590c4d8&w=740",
  },
  {
    id: 3,
    name: "Female",
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

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FullName
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
          Username
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
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();

      return <div className="font-medium">{formatted}</div>;
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
            <p onClick={() => navigator.clipboard.writeText(user.id)}>
              <ChangeUserPassword user={user} />
            </p>
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
