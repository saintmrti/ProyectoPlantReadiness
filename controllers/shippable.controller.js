const response = require("../helpers/response");
const {
  getSummary,
  insertShippable,
  updateShippable,
  deleteShippable,
} = require("../models/shippable.model");

module.exports.getShippables = (req, res) => {
  try {
    const { idProyecto } = req.query;
    const project = {
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, getSummary, project);
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
      qn_valida,
      prioridad,
      comentarios,
      idExpectativa,
      idProyecto,
    } = req.body;

    const newRegister = {
      nombre,
      evidencia,
      qn_valida,
      prioridad,
      comentarios: comentarios === "" ? null : `'${comentarios}'`,
      idExpectativa: parseInt(idExpectativa),
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, insertShippable, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.modifyShippable = (req, res) => {
  try {
    const { nombre, evidencia, qn_valida, prioridad, comentarios, id } =
      req.body;

    const newRegister = {
      nombre,
      evidencia,
      qn_valida: qn_valida || null,
      prioridad,
      comentarios: comentarios || null,
      idEntregable: parseInt(id),
    };
    response(res, false, updateShippable, newRegister);
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
    response(res, true, deleteShippable, deleteRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
