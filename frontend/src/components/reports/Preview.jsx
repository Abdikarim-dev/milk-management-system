import { forwardRef } from "react";
import DataTable from "./Report-Data-Table";

const Preview = forwardRef((props, ref) => {
  const { data,title, totals, columns } = props;
  return (
    <div ref={ref} className="max-w-full font-poppins">
      <div className="flex items-center justify-center gap-4">
        <img
          src="./android-chrome-512x512.png"
          alt="logo"
          className="w-14 h-14"
        />
        <h1 className="uppercase tracking-wider text-center  font-bold">
          Ishub Caano
        </h1>
      </div>
      <div className="pl-2 my-10 flex flex-col gap-2">
        <p className="text-xl ">Ishub Caano Company.</p>
        <p className="text-lg">{title} report</p>

        <p className="text-lg">Address: 1234 Ishub Caano Street, Mogadishu, Somalia</p>

        <p className="text-lg">Phone: +252-2-1111-2222</p>
      </div>
      <div>
        <DataTable columns={columns} data={data} totals={totals} />
      </div>
    </div>
  );
});

export default Preview;
