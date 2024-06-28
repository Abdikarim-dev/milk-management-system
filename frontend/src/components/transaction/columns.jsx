"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Row Selection
import { Checkbox } from "@/components/ui/checkbox";
import UpdateTransaction from "./UpdateTransaction";
import DeleteTransaction from "./DeleteTransaction";

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
    header: () => <div className="font-bold text-lg">Full Name</div>,
  },
  {
    accessorKey: "username",
    header: () => <div className="font-bold text-lg">User Name</div>,
  },
  {
    accessorKey: "litre",
    header: () => <div className="font-bold text-lg">Litres</div>,
    cell: ({ row }) => {
      const litre = row.getValue("litre");
      const formatted = (litre* 0.001).toLocaleString() +" Ltr";

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="font-bold text-lg">Price</div>,
    cell: ({ row }) => {
      const price = row.getValue("price");
      const formatted = price.toLocaleString();

      return <div className="font-medium">${formatted}</div>;
    },
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const transaction = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />

  //           <div className="flex flex-col gap-2 p-2 text-sm font-semibold">
  //             <p
  //               onClick={() => navigator.clipboard.writeText(transaction.id)}
  //             ></p>
  //             <p>
  //               <UpdateTransaction transaction={transaction} />
  //             </p>
  //             <p>
  //               <DeleteTransaction transaction={transaction} />
  //             </p>
  //           </div>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
