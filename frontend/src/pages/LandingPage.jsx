import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
  
    useEffect(() => {
      navigate("/login", { state: { from: "/" } });
    }, [navigate]);
  
    return <div></div>;
  }
  export default LandingPage;