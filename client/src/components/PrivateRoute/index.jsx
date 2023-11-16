import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Outlet /> : <Navigate to="notfound" />;
};

export default PrivateRoute;
