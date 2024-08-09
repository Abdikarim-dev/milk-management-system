import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import SidebarRoutes from "./components/SidebarRoutes";
import PublicRoute from "./components/PublicRoute";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="*"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        ></Route>
      </Routes>
      {user && <SidebarRoutes />}
    </>
  );
}

export default App;
