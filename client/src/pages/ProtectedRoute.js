import { Navigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext.js";

export default function ProtectedRoute({ children }) {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/Landing" />;
  }
  return children;
}
