import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import UsersTable from "../components/Tables/UsersTable";
import { fetchUsersRequest, updateUsersRequest } from "../slices/users";
import { summaryUsers } from "../selectors/users";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

const UserAccess = () => {
  const dispatch = useDispatch();
  const { idProyecto } = useParams();

  const { isFetching, didError, isFetchingUpdate } = useSelector(
    (state) => state.users
  );
  const users = useSelector(summaryUsers(idProyecto));

  const handleOnClickUsers = (users) => {
    const usersUpdate = {
      idProyecto,
      users,
    };
    dispatch(updateUsersRequest(usersUpdate));
  };

  useEffect(() => {
    dispatch(fetchUsersRequest({ idProyecto }));
  }, [dispatch, idProyecto]);
  return (
    <>
      {isFetching || isFetchingUpdate ? (
        <Spinner />
      ) : didError ? (
        <Error />
      ) : (
        <UsersTable
          list={users}
          idProyecto={idProyecto}
          handleOnClickUsers={handleOnClickUsers}
        />
      )}
    </>
  );
};

export default UserAccess;
