import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./isLoggedIn";

const GuestRoute = ({ children }) => {
  if (isUserLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
