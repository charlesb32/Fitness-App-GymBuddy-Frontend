import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// will route to children if user is authenticated
const AuthWrapper = ({ children }) => {
  const isAuthenticated = useSelector((state) => {
    console.log(state);
    return state.user.userInfo;
  });

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AuthWrapper;
