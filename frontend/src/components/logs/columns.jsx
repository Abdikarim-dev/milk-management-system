export const Reportcolumns = [
  // {
  //   accessorKey: "id",
  //   header: "id",
  // },
  {
    accessorKey: "fullname",
    header: () => <div className="font-bold text-lg">Created User</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="font-bold text-lg">Phone Number</div>,
  },
  {
    accessorKey: "type",
    header: () => <div className="font-bold text-lg">Type</div>,
    cell: (row) => {
      const cell = row.getValue("type");

      return <div className="font-semibold ">{cell}</div>;
    },
  },
  {
    accessorKey: "note",
    header: () => <div className="font-bold text-lg">Note</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-bold text-lg">Created Time</div>,
    cell: (row) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();

      return <div className="font-semibold">{formatted}</div>;
    },
  },
];
