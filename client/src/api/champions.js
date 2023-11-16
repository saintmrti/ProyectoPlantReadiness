import axios, { CancelToken } from "axios";

export const fetchChampionsApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/champions", {
        cancelToken: new CancelToken((c) => (fetchChampionsApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const insertChampionApi = {
  cancel: null,
  run: (champion) =>
    axios
      .post("/api/champions", champion, {
        cancelToken: new CancelToken((c) => (insertChampionApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateChampionApi = {
  cancel: null,
  run: (champion) =>
    axios
      .put("/api/champions", champion, {
        cancelToken: new CancelToken((c) => (updateChampionApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteChampionApi = {
  cancel: null,
  run: (idChampion) =>
    axios
      .delete(`/api/champions`, {
        cancelToken: new CancelToken((c) => (deleteChampionApi.cancel = c)),
        params: { idChampion },
      })
      .then(({ data }) => data),
};
