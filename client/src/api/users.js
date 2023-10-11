import axios, { CancelToken } from "axios";

export const fetchUsersApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/usuarios", {
        cancelToken: new CancelToken((c) => (fetchUsersApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const updateUsersApi = {
  cancel: null,
  run: (ship) =>
    axios
      .put("/api/usuarios", ship, {
        cancelToken: new CancelToken((c) => (updateUsersApi.cancel = c)),
      })
      .then(({ data }) => data),
};
