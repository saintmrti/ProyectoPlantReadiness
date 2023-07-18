import response from "../helpers/response.js";
import { insertShippable, getSummary } from "../models/shippable.model.js";

export const getShippables = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createShippable = (req, res) => {
  try {
    const {
      nombre,
      evidencia,
      prioridad,
      ponderacion,
      comentarios,
      idExpectativa,
    } = req.body;

    const newRegister = {
      nombre,
      evidencia,
      prioridad,
      ponderacion: parseInt(ponderacion),
      comentarios,
      idExpectativa: parseInt(idExpectativa),
    };
    response(res, null, insertShippable, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
