import { axiosInistance } from ".";

export const getLogs = async (username) => {
  try {
    const endpoint = username ? `/api/logs/${username}` : "/api/logs";
    const response = await axiosInistance.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const daily = async (username) => {
  try {
    const endpoint = username
      ? `/api/logs/daily/${username}`
      : "/api/logs/daily";
    const response = await axiosInistance.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const weekly = async (username) => {
  try {
    const endpoint = username
      ? `/api/logs/weekly/${username}`
      : "/api/logs/weekly";
    const response = await axiosInistance.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const monthly = async (username) => {
  try {
    const endpoint = username
      ? `/api/logs/monthly/${username}`
      : "/api/logs/monthly";
    const response = await axiosInistance.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
