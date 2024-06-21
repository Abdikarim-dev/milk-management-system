
export const columns = [
  {
    accessorKey: "fullname",
    header: () => <div className="font-bold text-lg">Full Name</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="font-bold text-lg">Phone Number</div>,
  },
  {
    accessorKey: "litre",
    header: () => <div className="font-bold text-lg">Litre</div>,
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
];
// export const columns = [
//   {
//     accessorKey: "id",
//     header: "id",
//   },
//   {
//     accessorKey: "litre",
//     header: "Litre",
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//   },
//   {
//     accessorKey: "milkTankId",
//     header: "Milk Tank Id",
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created At",
//     cell: ({ row }) => {
//       const date = new Date(row.getValue("createdAt"));
//       const formatted = date.toLocaleDateString();

//       return <div className="font-medium">{formatted}</div>;
//     },
//   },
//   // {
//   //   accessorKey: "updatedAt",
//   //   header: "Updated At",
//   //   cell: ({ row }) => {
//   //     const date = new Date(row.getValue("updatedAt"));
//   //     const formatted = date.toLocaleDateString();

//   //     return <div className="font-medium">{formatted}</div>;
//   //   },
//   // },
// ];
