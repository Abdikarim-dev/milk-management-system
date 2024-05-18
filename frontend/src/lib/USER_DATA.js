import { fetchUsersSales } from "@/apicalls/transactions";

const fetchData = async () => {
  const response = await fetchUsersSales();
  return response;
};
const data = await fetchData();

// Function to generate a random RGB color
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256); // Random between 0-255
  const g = Math.floor(Math.random() * 256); // Random between 0-255
  const b = Math.floor(Math.random() * 256); // Random between 0-255
  return `rgb(${r},${g},${b})`;
}

const litresOfMilk = data?.message?.map((element) => element?.username);
const prices = data?.message?.map((element) => element?.litre);
const backgroundColors = data?.message?.map(() => getRandomColor());
export const lineChartData = {
  labels: litresOfMilk,
  datasets: [
    {
      label: "Overview",
      data: prices,
      backgroundColor: backgroundColors,
    },
  ],
};
