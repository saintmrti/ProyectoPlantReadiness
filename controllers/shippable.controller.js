const response = require("../helpers/response");
const {
  getSummary,
  insertShippable,
  updateShippable,
  deleteShippable,
} = require("../models/shippable.model");

module.exports.getShippables = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createShippable = (req, res) => {
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

module.exports.modifyShippable = (req, res) => {
  try {
    const { nombre, evidencia, prioridad, ponderacion, comentarios, id } =
      req.body;

    const newRegister = {
      nombre,
      evidencia,
      prioridad,
      ponderacion: parseInt(ponderacion),
      comentarios,
      idEntregable: parseInt(id),
    };
    response(res, null, updateShippable, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.eliminateShippable = (req, res) => {
  try {
    const { idEntregable } = req.query;
    const deleteRegister = {
      idEntregable: parseInt(idEntregable),
    };
    response(res, null, deleteShippable, deleteRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
