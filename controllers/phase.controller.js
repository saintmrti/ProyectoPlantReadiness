const _ = require("lodash");
const response = require("../helpers/response");
const {
  insertPhase,
  getSummary,
  updatePhase,
  deletePhase,
} = require("../models/phase.model");

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

module.exports.modifyPhase = (req, res) => {
  try {
    const { idGrupo, fase, idProyecto } = req.body;
    const phase = {
      idGrupo,
      fase,
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, updatePhase, phase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deletePhase = (req, res) => {
  try {
    const { idGrupo, idProyecto } = req.query;
    const phase = {
      idGrupo: parseInt(idGrupo),
      idProyecto: parseInt(idProyecto),
    };
    response(res, true, deletePhase, phase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
