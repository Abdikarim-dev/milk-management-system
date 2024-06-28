import { useState, useEffect } from "react";
import DataTable from "./logs/Data-Table";
import { Reportcolumns } from "./logs/columns";
import { daily, getLogs, monthly, weekly } from "@/apicalls/logs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

function UsersLogs() {
  const [data, setData] = useState([]);

  const [logs, setLogs] = useState([
    { id: 1, type: "Daily Logs", isSelected: false },
    { id: 2, type: "Weekly Logs", isSelected: false },
    { id: 3, type: "Monthly Logs", isSelected: true },
    { id: 4, type: "All Logs", isSelected: false },
  ]);
  const [title, setTitle] = useState(logs[3].type);

  const callApiAfterChange = (state) => {
    switch (state) {
      case 1:
        {
          const fetchData = async () => {
            const data = await daily();
            setData(data?.logs);
            setTitle(logs[0].type);
          };
          fetchData();
        }
        break;
      case 2:
        {
          const fetchData = async () => {
            const data = await weekly();
            setData(data?.logs);
            setTitle(logs[1].type);
          };
          fetchData();
        }
        break;
      case 3:
        {
          const fetchData = async () => {
            const data = await monthly();
            setData(data?.logs);
            setTitle(logs[2].type);
          };
          fetchData();
        }
        break;
      case 4:
        {
          const fetchData = async () => {
            const data = await getLogs();
            setData(data?.logs);
            setTitle(logs[3].type);
          };
          fetchData();
        }
        break;

      default:
        break;
    }
  };
  const handleChange = (id) => {
    setLogs(
      logs.map((log) =>
        log.id === id
          ? { ...log, isSelected: true }
          : { ...log, isSelected: false }
      )
    );
    callApiAfterChange(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLogs();
      setData(data?.logs);
    };
    fetchData();
  }, []);
  return (
    <section className="py-4 px-10 w-full">
      <div className="flex  justify-between pb-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold">System Activities</span>
          <span className="text-gray-500 pl-3">({title})</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Choose Log Type <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {logs.map((value) => {
              return (
                <DropdownMenuCheckboxItem
                  key={value.id}
                  className="capitalize"
                  checked={value.isSelected}
                  onClick={() => {
                    handleChange(value.id);
                  }}
                >
                  {value.type}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* TABLE */}
      <DataTable columns={Reportcolumns} data={data} />
    </section>
  );
}

export default UsersLogs;
