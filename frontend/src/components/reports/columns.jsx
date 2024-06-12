// import { Button } from "@/components/ui/button";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";

export const columns = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "litre",
    header: "Litre",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "milkTankId",
    header: "Milk Tank Id",
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
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formatted = date.toLocaleDateString();

      return <div className="font-medium">{formatted}</div>;
    },
  },
];
