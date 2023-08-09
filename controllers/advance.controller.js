const _ = require("lodash");

const response = require("../helpers/response");
const { getSummary, insertAdvance } = require("../models/advance.model");

module.exports.getAdvances = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createAdvance = (req, res) => {
  try {
    const { filteredArray } = req.body;

    const modifiedArray = _.map(filteredArray, (item) => {
      return {
        idEntregable: parseInt(item.idEntregable),
        idFase: item.idFase,
        responsable: item.responsible === "" ? null : `'${item.responsible}'`,
        fecha_inicio: item.startDate === "" ? null : `'${item.startDate}'`,
        fecha_termino: item.endDate === "" ? null : `'${item.endDate}'`,
        fecha_real: item.realDate === "" ? null : `'${item.realDate}'`,
        avance: item.advance === "" ? null : item.advance,
        comentarios: item.comments === "" ? null : `'${item.comments}'`,
      };
    });
    response(res, null, insertAdvance, modifiedArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
