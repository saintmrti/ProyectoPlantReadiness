import response from "../helpers/response.js";
import { insertAdvance, getSummary } from "../models/advance.model.js";

export const getAdvance = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAdvance = (req, res) => {
  try {
    const {
      idEntregable,
      idMaquina,
      idFase,
      responsable,
      fecha_inicio,
      fecha_termino,
      fecha_real,
      avance,
      comentarios,
    } = req.body;
    const newRegister = {
      idEntregable: parseInt(idEntregable),
      idMaquina: parseInt(idMaquina),
      idFase: parseInt(idFase),
      responsable,
      fecha_inicio,
      fecha_termino,
      fecha_real,
      avance: parseInt(avance),
      comentarios,
    };
    response(res, null, insertAdvance, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
