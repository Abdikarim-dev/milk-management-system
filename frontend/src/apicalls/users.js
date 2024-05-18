import { axiosInistance } from ".";

export const loginUserApi = async (payload) => {
  try {
    const response = await axiosInistance.post(
      "/api/users/login-user",
      payload
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserData = async () => {
  try {
    const response = await axiosInistance.get("/api/users/get-users");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getUserInfo = async () => {
  try {
    const response = await axiosInistance.get("/api/users/get-user-info");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const registerUserApi = async (payload) => {
  try {
    const response = await axiosInistance.post("/api/users/add-user", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateUserApi = async (payload, id) => {
  try {
    const response = await axiosInistance.post(
      `/api/users/edit-user/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const DeleteUserApi = async (payload) => {
  try {
    const response = await axiosInistance.delete(
      `/api/users/remove-user/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// export const getUserInfo = async () => {
//   try {
//     const response = await axiosInistance.get("/api/users/get-user-info");
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

export const changePassword = async (payload,id) => {
  try {
    const response = await axiosInistance.post(
      `/api/users/change-password/${id}`,payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
