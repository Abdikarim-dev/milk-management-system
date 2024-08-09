import { axiosInistance } from ".";

export const dailyReport = async (username) => {
  try {
    const endpoint = username
      ? `/api/report/daily/${username}`
      : "/api/report/daily";
    const response = await axiosInistance.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const weeklyReport = async (username) => {
  try {
    const endpoint = username
      ? `/api/report/weekly/${username}`
      : "/api/report/weekly";
    const response = await axiosInistance.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const monthlyReport = async (username) => {
  try {
    const endpoint = username
      ? `/api/report/monthly/${username}`
      : "/api/report/monthly";
    const response = await axiosInistance.get(endpoint);
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
    const response = await axiosInistance.get(
      `/api/transaction/get-transactions-by-weekly/${payload}`
    );
    // console.log(response.data)
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
