import { Route, Routes, useNavigate } from "react-router-dom";

// import { useAuth } from "../AuthProvider";
import Home from "@/components/dashboard/Home";
// import Main from "@/components/dashboard/Main";
// import UsersReport from "./UsersReport";
// import UserProfile from "./UserProfile";
// import { useUser } from "@/hooks/useUser";
import { useSelector } from "react-redux";
// import Users from "./Users";
// import Transactions from "./Transactions";
import ProtectedRoute from "./ProtectedRoute";
import { sidebar } from "./SidebarValues";
import Main from "./dashboard/Main";
import Users from "./Users";
import Transactions from "./Transactions";
import UsersReport from "./UsersReport";
import UserProfile from "./UserProfile";

function SidebarRoutes() {
  const userInfo = useSelector((state) => state.user.user);

  if (!userInfo) {
    return null; // Or render something else if the user is not logged in
  }
  return (
    <Home>
      <Routes>
        <Route
          path={"/home"}
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />

        <Route
          path={"/user"}
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path={"/transaction"}
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path={"/report"}
          element={
            <ProtectedRoute>
              <UsersReport />
            </ProtectedRoute>
          }
        />
        
        <Route
          path={"/profile"}
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Home>
  );
}

export default SidebarRoutes;
