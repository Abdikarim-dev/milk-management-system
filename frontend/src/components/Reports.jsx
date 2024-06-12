import { useState, useEffect, useRef } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import DataTable from "./reports/Report-Data-Table";
import { columns } from "./reports/columns";
import { fetchUsersSales } from "@/apicalls/transactions";
import { dailyReport, monthlyReport, weeklyReport } from "@/apicalls/reports";
import UserModal from "./UserModal";
import CustomReport from "./reports/CustomReport";
import { useReactToPrint } from "react-to-print";
import Preview from "./reports/Preview";

function Reports() {
  const componentRef = useRef();
  const pdfRef = useRef();
  const [data, setData] = useState([]);
  const [custom, setCustom] = useState(false);
  const [total, setTotal] = useState([]);
  const [title, setTitle] = useState("Monthly");
  const [reports, setReports] = useState([
    { id: 1, type: "Daily", isSelected: false },
    { id: 2, type: "Weekly", isSelected: false },
    { id: 3, type: "Monthly", isSelected: true },
    { id: 4, type: "Custom Date", isSelected: false },
  ]);

  const callApiAfterChange = (state) => {
    switch (state) {
      case 1:
        {
          const fetchData = async () => {
            const data = await dailyReport();
            setData(data?.transactions);
            setTitle(reports[0].type);
          };
          fetchData();
          setCustom(false);
        }
        break;
      case 2:
        {
          const fetchData = async () => {
            const data = await weeklyReport();
            setData(data?.transactions);
            setTitle(reports[1].type);
          };
          fetchData();
          setCustom(false);
        }
        break;
      case 3:
        {
          const fetchData = async () => {
            const data = await monthlyReport();
            setData(data?.transactions);
            setTitle(reports[2].type);
          };
          fetchData();
          setCustom(false);
        }
        break;
      case 4:
        {
          setData([]);
          setCustom(true);
          setTitle(reports[3].type);
        }
        break;

      default:
        break;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleChange = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id
          ? { ...report, isSelected: true }
          : { ...report, isSelected: false }
      )
    );
    callApiAfterChange(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await monthlyReport();
      setData(data?.transactions);
      setTotal(data?.fullInfo);
    };
    fetchData();
  }, []);

  const downloadPdf = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("SAMPLE TEMPLATE PDF");
    });
  };
  return (
    <section className="py-12 px-10 w-full">
      <div>
        <p className="text-3xl font-bold pb-10">{title} REPORT</p>
      </div>
      <div className="flex items-center gap-4 pb-4">
        {/* DROP DOWN FOR COLUMN FILTERING */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Choose Report Type <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {reports.map((value) => {
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
        {custom && <CustomReport setData={setData} setTotal={setTotal} />}
        <button onClick={handlePrint}>Print</button>
      </div>
      {/* TABLE */}
      <div ref={downloadPdf}>
        <DataTable columns={columns} data={data} />
      </div>
      <div>
        <Preview ref={componentRef} data={data} />
      </div>
    </section>
  );
}

export default Reports;