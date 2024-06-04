import { getSpecificTransactions } from "@/apicalls/transactions";

// const fetchData = async () => {
//   const response = await getSpecificTransactions();
//   return response && response?.data[0];
// };
// const data = await fetchData();

const data = [];

// Function to generate a random RGB color
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256); // Random between 0-255
  const g = Math.floor(Math.random() * 256); // Random between 0-255
  const b = Math.floor(Math.random() * 256); // Random between 0-255
  return `rgb(${r},${g},${b})`;
};

// const litresOfMilk = data?._sum.litre;
// const prices = data?._sum.price;
// const count = data?._count.userId*1000;
const backgroundColors = getRandomColor();
export const userChartData = {
  labels: ["NO Of LITRES", "No Of Transaction"],
  datasets: [
    {
      label: "Overview",
      data: ["litresOfMilk", "count"],
      backgroundColor: backgroundColors,backgroundColors,
    },
  ],
};
