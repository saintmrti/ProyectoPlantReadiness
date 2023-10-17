import axios, { CancelToken } from "axios";

export const fetchProductsApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .get("/api/productos", {
        cancelToken: new CancelToken((c) => (fetchProductsApi.cancel = c)),
        params: { idProyecto },
      })
      .then(({ data }) => data),
};

export const insertProductsApi = {
  cancel: null,
  run: (prod) =>
    axios
      .post("/api/productos", prod, {
        cancelToken: new CancelToken((c) => (insertProductsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateProductsApi = {
  cancel: null,
  run: (prod) =>
    axios
      .put("/api/productos", prod, {
        cancelToken: new CancelToken((c) => (updateProductsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteProductsApi = {
  cancel: null,
  run: (idMaquina) =>
    axios
      .delete("/api/productos", {
        cancelToken: new CancelToken((c) => (deleteProductsApi.cancel = c)),
        params: { idMaquina },
      })
      .then(({ data }) => data),
};
