import { useState, useEffect } from "react";
import DataTable from "./user/Report-Data-Table";
import { columns } from "./user/columns";
import {getUserData} from './../apicalls/users.js'
import { Reportcolumns } from "./user/report-columns";
import { fetchUsersSales } from "@/apicalls/transactions";

function UsersReport() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsersSales();
      setUsers(data?.message);
    };
    fetchData();
  }, []);
  return (
    <section className="py-12 px-10 w-full">
      <div>
        <p className="text-3xl font-bold pb-10">USERS TRANSACTION REPORT</p>
      </div>
      {/* TABLE */}
      <DataTable columns={Reportcolumns} data={users } />
      
      
    </section>
  );
}

export default UsersReport;
