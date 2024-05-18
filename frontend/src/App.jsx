import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import { AuthProvider } from "./AuthProvider";
import SidebarRoutes from "./components/SidebarRoutes";
import PublicRoute from "./components/PublicRoute";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
// import Demo from "./components/Demo";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
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
      <SidebarRoutes />

      {/* </AuthProvider> */}
      {/* <Demo/> */}
    </>
  );
}

export default App;
