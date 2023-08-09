const _ = require("lodash");
const response = require("../helpers/response");
const { insertPhase, getSummary } = require("../models/phase.model");

module.exports.getPhases = (req, res) => {
  try {
    response(res, null, getSummary);
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
        idGrupo: item.idGrupo,
        fase: item.fase,
      };
    });
    response(res, null, insertPhase, modifiedArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
