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

export const getTransactions = async () => {
  try {
    const response = await axiosInistance.get(
      `/api/transaction/get-transactions`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getTransactionsByUser = async (payload) => {
  try {
    const response = await axiosInistance.get(
      `/api/transaction/get-transactions-by-each-username/${payload}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getSpecificTransactions = async (payload) => {
  try {
    const response = await axiosInistance.get(
      `/api/transaction/get-transactions-by-active-user/${payload}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const RegisterTransaction = async (payload) => {
  try {
    const response = await axiosInistance.post(
      "/api/transaction/add-transaction",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateTransaction = async (payload,id) => {
  try {
    const response = await axiosInistance.post(
      `/api/transaction/edit-transaction/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteTransaction = async (payload) => {
  try {
    const response = await axiosInistance.post(
      `/api/transaction/remove-transaction/${payload.id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
