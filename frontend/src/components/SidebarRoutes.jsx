import { Route, Routes } from "react-router-dom";

// import { useAuth } from "../AuthProvider";
import Home from "@/components/dashboard/Home";
import Main from "@/components/dashboard/Main";
import UsersReport from "./UsersReport";
import UserProfile from "./UserProfile";
// import { useUser } from "@/hooks/useUser";
import { useSelector } from "react-redux";
import Users from "./Users";
import Transactions from "./Transactions";

function SidebarRoutes() {
  const userInfo = useSelector(state=> state.user.user )

  if (!userInfo) {
    return null; // Or render something else if the user is not logged in
  }
  return (
    <Home>
      <Routes>
        <Route path="/home" element={<Main />}></Route>
        <Route path="/user" element={<Users />}></Route>
        <Route path="/report" element={<UsersReport />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/transaction" element={<Transactions />}></Route>
      </Routes>
    </Home>
  );
}

export default SidebarRoutes;
