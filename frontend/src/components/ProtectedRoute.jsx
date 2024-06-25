import { deleteActiveUser, getUserInfo } from "@/apicalls/users";
import {
  checkSession,
  getUserDetails,
  loginUser,
} from "@/redux/features/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  console.log("HERE");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  const getData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        const user = {
          username: response?.data,
          expiresIn: localStorage.getItem("tokenExpiration"),
          token: localStorage.getItem("token"),
        };
        console.log(user);
        dispatch(loginUser(user));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      deleteActiveUser();
      navigate("/login");
    } else {
      getData();
    }
  }, [navigate]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
