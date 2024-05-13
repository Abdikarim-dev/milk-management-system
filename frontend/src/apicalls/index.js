import axios from "axios";

export const axiosInistance = axios.create({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
