const _ = require("lodash");

const response = require("../helpers/response");
const {
  getSummary,
  insertAdvance,
  updateAdvance,
} = require("../models/advance.model");

module.exports.getAdvances = (req, res) => {
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

module.exports.createAdvance = (req, res) => {
  try {
    const { advance } = req.body;
    const modifiedArray = _.map(advance, (item) => {
      return {
        idEntregable: parseInt(item.idEntregable),
        idProyecto: parseInt(item.idProyecto),
        idMaquina: item.idMaquina,
        responsable: item.responsible === "" ? null : `'${item.responsible}'`,
        fecha_inicio: item.startDate === "" ? null : `'${item.startDate}'`,
        fecha_termino: item.endDate === "" ? null : `'${item.endDate}'`,
        fecha_real: item.realDate === "" ? null : `'${item.realDate}'`,
        avance: item.advance === "" ? null : item.advance,
        comentarios: item.comments === "" ? null : `'${item.comments}'`,
      };
    });
    response(res, false, insertAdvance, modifiedArray);
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
      idUsuario,
      ult_fecha_inicio,
      ult_fecha_termino,
      ult_fecha_real,
    } = req.body;
    const modifiedRegister = {
      idAvance,
      idUsuario,
      responsable: responsable || null,
      fecha_inicio: fecha_inicio || null,
      fecha_termino: fecha_termino || null,
      fecha_real: fecha_real || null,
      avance: parseInt(avance),
      comentarios: comentarios || null,
      ult_fecha: [[ult_fecha_inicio, 1], [ult_fecha_termino, 2], [ult_fecha_real, 3]]
    };
    response(res, false, updateAdvance, modifiedRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
