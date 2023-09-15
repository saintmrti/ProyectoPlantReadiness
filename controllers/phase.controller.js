const _ = require("lodash");
const response = require("../helpers/response");
const { insertPhase, getSummary } = require("../models/phase.model");

module.exports.getPhases = (req, res) => {
  try {
    const { idProyecto } = req.query;
    const project = {
      idProyecto: parseInt(idProyecto),
    };
    response(res, null, getSummary, project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createPhase = (req, res) => {
  try {
    const { newPhases } = req.body;

    const modifiedArray = _.map(newPhases, (item) => {
      return {
        idMaquina: item.idMaquina,
        idGrupo: item.idGrupo,
        fase: item.fase,
        maquina: item.maquina,
        idProyecto: item.idProyecto,
      };
    });
    response(res, null, insertPhase, modifiedArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
