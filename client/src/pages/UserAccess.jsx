import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import UsersTable from "../components/Tables/UsersTable";
import { fetchUsersRequest, updateUsersRequest } from "../slices/users";
import { getUsers } from "../selectors/users";

const UserAccess = () => {
  const dispatch = useDispatch();
  const { idProyecto } = useParams();

  // const { list: users } = useSelector((state) => state.users);
  const users = useSelector(getUsers);

  const handleOnClickUsers = (users) => {
    const usersUpdate = {
      idProyecto,
      users,
    };
    console.log(usersUpdate);
    dispatch(updateUsersRequest(usersUpdate));
  };

  useEffect(() => {
    dispatch(fetchUsersRequest({ idProyecto }));
  }, [dispatch, idProyecto]);
  return (
    <>
      <UsersTable
        list={users}
        idProyecto={idProyecto}
        handleOnClickUsers={handleOnClickUsers}
      />
    </>
  );
};

export default UserAccess;
