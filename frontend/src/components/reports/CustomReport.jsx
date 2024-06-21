"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { customReport } from "@/apicalls/reports";

function CustomReport({ setData, setTotal }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (dateString, setType) => {
    // Create a new Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) {
      throw new Error("Invalid date");
    }

    // Format the date to 'yyyy-MM-dd'
    setType(format(date, "yyyy-MM-dd"));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    formatDate(startDate, setStartDate);
    formatDate(endDate, setEndDate);

    const dataToBeSend = {
      startDate,
      endDate,
    };

    try {
      const fetchData = async () => {
        const data = await customReport(dataToBeSend);
        console.log(dataToBeSend)
        setData(data?.fullInfo);
        setTotal(data?.totals);
      };
      fetchData();
    } catch (error) {
      console.log(error.data.message);
    }
  };
  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PPP") : <span>Starting Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "PPP") : <span>Ending Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button>Generate</Button>
    </form>
  );
}

export default CustomReport;
