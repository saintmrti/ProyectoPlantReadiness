import response from "../helpers/response.js";
import { insertShippable, getSummary } from "../models/shippable.model.js";

export const getShippable = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createShippable = (req, res) => {
  const {
    nombre,
    evidencia,
    prioridad,
    ponderacion,
    comentarios,
    expectativa,
  } = req.body;
  try {
    const newRegister = {
      nombre,
      evidencia,
      prioridad,
      ponderacion: parseInt(ponderacion),
      comentarios,
      expectativa: parseInt(expectativa),
    };
    response(res, null, insertShippable, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
