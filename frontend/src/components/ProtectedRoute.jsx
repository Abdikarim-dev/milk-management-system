import { getUserInfo } from "@/apicalls/users";
import { getUserDetails } from "@/redux/features/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  const getData = async () => {
    try {
      // const toastId = toast.loading("Getting Logged In User Info...");
      const response = await getUserInfo();
      console.log(response)
      if (response.success) {
        // dispatch(checkSession(localStorage.getItem("tokenExpiration")));
        console.log(response.data)
        dispatch(getUserDetails(response.data))
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) navigate("/login");
  // }, [ navigate]);

  // if (!localStorage.getItem("token")) return null;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      // getData();
    }
  }, [navigate]);
  if (!localStorage.getItem("token")) {
    return null;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;