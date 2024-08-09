import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "@/components/dashboard/Home";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./dashboard/Main";
import Users from "./user/Users";
import Transactions from "./transaction/Transactions";
// import UsersReport from "./UsersReport";
import UserProfile from "./user/UserProfile";
import Tanks from "./tank/Tanks";
import Reports from "./reports/Reports";
import Logs from "./logs/Logs";

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
          path={"/reports"}
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/log"}
          element={
            <ProtectedRoute>
              <Logs />
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
