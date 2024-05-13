import { Route, Routes } from "react-router-dom";

// import { useAuth } from "../AuthProvider";
import Banner from "@/components/dashboard/Banner";
import Main from "@/components/dashboard/Main";
import UsersReport from "./UsersReport";
import UserProfile from "./UserProfile";
// import { useUser } from "@/hooks/useUser";
import { useSelector } from "react-redux";
import Users from "./Users";

function SidebarRoutes() {
  const userInfo = useSelector(state=> state.user.user )

  if (!userInfo) {
    return null; // Or render something else if the user is not logged in
  }
  return (
    <Banner>
      <Routes>
        <Route path="/home" element={<Main />}></Route>
        <Route path="/user" element={<Users />}></Route>
        <Route path="/report" element={<UsersReport />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
    </Banner>
  );
}

export default SidebarRoutes;
