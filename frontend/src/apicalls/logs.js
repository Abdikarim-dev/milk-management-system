import { axiosInistance } from ".";

export const getLogs = async () => {
  try {
    const response = await axiosInistance.get("/api/logs");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const daily = async () => {
  try {
    const response = await axiosInistance.get("/api/logs/daily");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const weekly = async () => {
  try {
    const response = await axiosInistance.get("/api/logs/weekly");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const monthly = async () => {
  try {
    const response = await axiosInistance.get("/api/logs/monthly");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
