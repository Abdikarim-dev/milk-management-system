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

const colorPalette = [
  "#1B265B", // Essential Color 1
  "#007BFF", // Essential Color 2
  "#16204D",
  "#005FCC",
  "#131A42",
  "#004CAA",
  "#101536",
  "#003988",
  "#0D0F2A",
  "#002666",
  "#0A0A1F",
  "#001344",
  "#070514",
  "#000022",
  "#0033A0",
  "#002080",
  "#001860",
  "#010C48",
  "#0044CC",
  "#0033FF"
];

const usernames = data?.message?.map((element) => element?.username);
const litres = data?.message?.map((element) => element?.litre);
const backgroundColors = data?.message?.map(() => getRandomColor());
export const lineChartData = {
  labels: usernames,
  datasets: [
    {
      label: "Overview",
      data: litres,
      backgroundColor: backgroundColors,
    },
  ],
};








