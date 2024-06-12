import { useSelector } from "react-redux";
import { axiosInistance } from ".";

export const dailyReport = async () => {
  try {
    const response = await axiosInistance.get("/api/report/daily");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const weeklyReport = async () => {
  try {
    const response = await axiosInistance.get("/api/report/weekly");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const monthlyReport = async () => {
  try {
    const response = await axiosInistance.get("/api/report/monthly");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const customReport = async (payload) => {
  try {
    const response = await axiosInistance.post("/api/report/custom", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const transactionWeeklyReport = async (payload) => {
  try {
    const response = await axiosInistance.get(`/api/transaction/get-transactions-by-weekly/${payload}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
