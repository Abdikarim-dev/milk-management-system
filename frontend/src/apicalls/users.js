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

export const getUserData = async ()=>{
  try{
    const response = await axiosInistance.get("/api/users/get-users");
    return response.data;
  }catch(error){
    return error.response.data;
  }
}
export const registerUserApi = async (payload)=>{
  try{
    const response = await axiosInistance.post("/api/users/add-user",payload);
    return response.data;
  }catch(error){
    return error.response.data;
  }
}