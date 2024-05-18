import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  if (localStorage.getItem("token")) {
    return null;
  }
  return <div>{children}</div>;
}

export default PublicRoute;
