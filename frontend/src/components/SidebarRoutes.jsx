import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "@/components/dashboard/Home";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./dashboard/Main";
import Users from "./Users";
import Transactions from "./Transactions";
import UsersReport from "./UsersReport";
import UserProfile from "./UserProfile";
import Tanks from "./Tanks";

function SidebarRoutes() {
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
          path={"/tank"}
          element={
            <ProtectedRoute>
              <Tanks />
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
