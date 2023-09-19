const _ = require("lodash");
const response = require("../helpers/response");
const { insertPhase, getSummary } = require("../models/phase.model");

module.exports.getPhases = (req, res) => {
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

module.exports.createPhase = (req, res) => {
  try {
    const { newPhases } = req.body;
    const modifiedArray = _.map(newPhases, (item) => {
      return {
        idMaquina: parseInt(item.idMaquina),
        idGrupo: parseInt(item.idGrupo),
        fase: item.fase,
        idProyecto: parseInt(item.idProyecto),
      };
    });
    response(res, false, insertPhase, modifiedArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
