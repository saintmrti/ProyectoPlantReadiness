const _ = require("lodash");

const response = require("../helpers/response");
const {
  getSummary,
  insertAdvance,
  updateAdvance,
} = require("../models/advance.model");

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

module.exports.modifyAdvance = (req, res) => {
  try {
    const {
      responsable,
      fecha_inicio,
      fecha_termino,
      fecha_real,
      avance,
      comentarios,
      idAvance,
    } = req.body;
    const modifiedRegister = {
      idAvance,
      responsable: responsable === "" ? null : `'${responsable}'`,
      fecha_inicio: fecha_inicio === "" ? null : `'${fecha_inicio}'`,
      fecha_termino: fecha_termino === "" ? null : `'${fecha_termino}'`,
      fecha_real: fecha_real === "" ? null : `'${fecha_real}'`,
      avance: avance === "" ? null : avance,
      comentarios: comentarios === "" ? null : `'${comentarios}'`,
    };

    response(res, null, updateAdvance, modifiedRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
