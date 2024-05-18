import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { lineChartData } from "../../lib/ADMIN_DATA";

ChartJS.register(
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function PieGraph() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          // Customize labels to include percentages
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const total = meta.total;
                const value = chart.data.datasets[0].data[i];
                const percentage = ((value / total) * 100).toFixed(2) + '%';

                return {
                  text: label + ' - ' + percentage,
                  fillStyle: meta.data[i].options?.backgroundColor,
                };
              });
            }
            return [];
          }
        },
        
      },
      title: {
        display: true,
        text: 'OVERVIEW PERFORMANCE',
        font: {
          size: 24,
          weight: 'bold'
        }
      },
      tooltip: {
        font: {
          size: 24,
          weight: 'bold'
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.chart._metasets[0].total;
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return `${label}: ${percentage}`;
          }
        }
      }
    },
  };
  return (
    <div className="w-full lg:w-1/3 h-[450px] border border-[#E4E4E7] rounded-lg px-4 py-5 ">
      <Pie options={options} data={lineChartData} />
    </div>
  );
}

export default PieGraph;
