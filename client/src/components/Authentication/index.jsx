import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { authSuccess } from "../../slices/auth";
import { Spinner } from "../Spinner";

const Authentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      try {
        jwtDecode(token);
        dispatch(authSuccess(token));
      } catch (error) {
        navigate("nofound");
      }
    }
  }, []);

  return isAuth ? <Navigate to="/proyectos" replace={true} /> : <Spinner />;
};

export default Authentication;
