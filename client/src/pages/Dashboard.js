import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";

export default function DashBoard() {
  const navigate = useNavigate();

  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      // setTimeout(() => {
      navigate("/stats");
      // }, 3000);
    }
  }, [user, navigate]);
  return <h1>Dashboard page</h1>;
}
