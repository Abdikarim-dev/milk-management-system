import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return null;
  }

  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// const initialState = {
//   user: getUserFromLocalStorage(),
//   tokenExpiration: localStorage.getItem("expirationTime") || null,
// };

const initialState = {
  user: null,
  token: null,
  tokenExpiration: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);
      const { username, expiresIn, token } = action.payload;

      const expirationTime = new Date().getTime() + expiresIn * 1000;

      // localStorage.setItem("user", JSON.stringify(username));
      // localStorage.setItem("expirationTime", expirationTime.toString());

      localStorage.setItem("token", token.toString());

      state.user = username;
      state.token = token;
      state.tokenExpiration = expirationTime;
    },
    logoutUser: (state) => {
      // localStorage.removeItem("user");
      // localStorage.removeItem("expirationTime");

      state.user = null;
      state.tokenExpiration = null;
    },
    checkSession: (state) => {
      const currentTime = new Date().getTime();
      if (currentTime >= parseInt(state.tokenExpiration)) {
        userSlice.caseReducers.logoutUser(state);
      }
    },
  },
});

export const { loginUser, logoutUser, checkSession } = userSlice.actions;
export default userSlice.reducer;
