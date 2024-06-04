import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { lineChartData } from "../../lib/ADMIN_DATA";
import { userChartData } from "../../lib/USER_DATA";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarGraph() {
  const { user } = useSelector((state) => state.user);

  const chartData = user?.userType === "admin" ? lineChartData : userChartData;

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
  };
  return (
    <div className="w-full lg:w-2/3 h-[450px] border border-[#E4E4E7] rounded-lg px-4 py-5 ">
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BarGraph;
