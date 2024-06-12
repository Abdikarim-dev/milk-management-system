import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { transactionWeeklyReport } from "@/apicalls/reports";

// Register the components for Line Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let options = {
  maintainAspectRatio: false, // Add this to ensure chart fills the container
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "OVERVIEW PERFORMANCE",
      position: "top",
      font: {
        size: 24,
        weight: "bold",
      },
    },
  },
  scales: {
    y: {
      grid: {
        color: "rgba(0,0,0,0.1)", // Grid color
      },
      ticks: {
        color: "#000", // Tick color
      },
    },
    x: {
      grid: {
        color: "rgba(0,0,0,0)", // Grid color
      },
      ticks: {
        color: "#000", // Tick color
      },
    },
  },
};

// Adjust the size of the chart
const chartHeight = 400; // Set the desired height
const chartWidth = 600; // Set the desired width

function LineChart(props) {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256); // Random between 0-255
    const g = Math.floor(Math.random() * 256); // Random between 0-255
    const b = Math.floor(Math.random() * 256); // Random between 0-255
    return `rgb(${r},${g},${b})`;
  };
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await await transactionWeeklyReport();
      // setData();

      setData(response?.message);
      console.log(response)

      // response?.message?.map((el) => console.log(el));
    };
    fetchData();
  }, []);

  const days = [];

  for (const key in data) {
    // Access the name property and push it to the namesArray
    days.push(data[key].name);
  }
  const transactions = [];
  const bgColor = [];

  for (const key in data) {
    // Access the name property and push it to the namesArray
    transactions.push(data[key].noOfTransactions);
  }
  for (const key in data) {
    // Access the name property and push it to the namesArray
    bgColor.push(getRandomColor());
  }
  console.log(bgColor);

  const lineChartData = {
    labels: days,
    datasets: [
      {
        label: "Weekly Transactions",
        data: transactions,
        backgroundColor: bgColor,
        borderColor: "green",
        borderWidth: 2,
        borderDash: [2, 5], // Dotted line
        // fill: [true,false],
        // borderColor: "#007bff", // Border color
        // borderWidth: 2, // Border width
        // borderCapStyle: "round", // Cap style of the line
        // borderDash: [5, 5], // Length and spacing of dashes
        // borderDashOffset: 0, // Offset for line dashes
        // borderJoinStyle: "miter", // Line joint style
        // fill: true, // Fill the area under the line
        // tension: 0.4, // Bezier curve tension of the line
        // showLine: true, // Whether to draw the line
        // spanGaps: true, // Whether to draw lines between points with null data
      },
    ],
  };
  return (
    <div style={{ height: chartHeight, width: "100%" }}>
      <Line data={lineChartData} options={options} />
    </div>
  );
}

export default LineChart;
