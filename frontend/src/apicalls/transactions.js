import { axiosInistance } from ".";

export const fetchUsersSales = async () => {
  try {
    const response = await axiosInistance.get(
      "/api/transaction/get-transactions-by-each-user"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
