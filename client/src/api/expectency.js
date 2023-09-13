import axios, { CancelToken } from "axios";

export const insertExpectancyApi = {
  cancel: null,
  run: (exp) =>
    axios
      .post("/api/expectativas", exp, {
        cancelToken: new CancelToken((c) => (insertExpectancyApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const fetchExpectancyApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/expectativas", {
        cancelToken: new CancelToken((c) => (fetchExpectancyApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateExpectancyApi = {
  cancel: null,
  run: (exp) =>
    axios
      .put("/api/expectativas", exp, {
        cancelToken: new CancelToken((c) => (updateExpectancyApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteExpectancyApi = {
  cancel: null,
  run: (idExpectativa) =>
    axios
      .delete("/api/expectativas", {
        cancelToken: new CancelToken((c) => (deleteExpectancyApi.cancel = c)),
        params: { idExpectativa },
      })
      .then(({ data }) => data),
};
