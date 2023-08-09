import axios, { CancelToken } from "axios";

export const insertMachineApi = {
  cancel: null,
  run: (mach) =>
    axios
      .post("/api/maquinas", mach, {
        cancelToken: new CancelToken((c) => (insertMachineApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const fetchMachinesApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/maquinas", {
        cancelToken: new CancelToken((c) => (fetchMachinesApi.cancel = c)),
      })
      .then(({ data }) => data),
};
