import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./AuthProvider";
import SidebarRoutes from "./components/SidebarRoutes";
import Demo from "./components/Demo";

function App() {
  return (

    <>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
        <SidebarRoutes/>
      {/* </AuthProvider> */}
      {/* <Demo/> */}
    </>
  );
}

export default App;
