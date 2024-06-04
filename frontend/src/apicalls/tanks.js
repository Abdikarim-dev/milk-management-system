import { axiosInistance } from ".";

export const getTanksData = async () => {
  try {
    const {data} = await axiosInistance.get("/api/tank/get-tanks");
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const registerTanksApi = async (payload) => {
  try {
    const response = await axiosInistance.post("/api/tank/add-tank", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateTanksApi = async (payload, id) => {
  try {
    const response = await axiosInistance.post(
      `/api/tank/edit-tank/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const DeleteTanksApi = async (payload) => {
  try {
    const response = await axiosInistance.delete(
      `/api/tank/remove-tank/${payload}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
