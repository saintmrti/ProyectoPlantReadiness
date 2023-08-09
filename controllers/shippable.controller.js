const response = require("../helpers/response");
const { getSummary, insertShippable } = require("../models/shippable.model");

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
