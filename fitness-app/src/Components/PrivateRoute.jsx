import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated }) => {
  console.log(isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
