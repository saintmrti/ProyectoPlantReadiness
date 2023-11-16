import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { getUserAccessById, summaryUsers } from "../../selectors/users";
import { changeAccess } from "../../slices/auth";

const ProjectAccessRoute = () => {
  const dispatch = useDispatch();
  const { idProyecto } = useParams();
  const { hasAccess, tokenData } = useSelector((state) => state.auth);
  const users = useSelector(summaryUsers(idProyecto));
  const access = useSelector(getUserAccessById(idProyecto, tokenData.userId));
  useEffect(() => {
    if (!_.isEmpty(users)) {
      dispatch(changeAccess(access === true ? "true" : "false"));
    }
  }, [dispatch, access, users]);
  return hasAccess === "true" || access ? (
    <Outlet />
  ) : (
    <Navigate to="notfound" />
  );
};

export default ProjectAccessRoute;
