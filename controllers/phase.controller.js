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
    const { idProyecto, name } = req.body;
    const newMachines = {
      idProyecto: parseInt(idProyecto),
      fase: name,
    };
    response(res, false, insertPhase, newMachines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.modifyPhase = (req, res) => {
  try {
    const { id, fase } = req.body;
    const phase = {
      idFase: id,
      fase,
    };
    response(res, false, updatePhase, phase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deletePhase = (req, res) => {
  try {
    const { idFase } = req.query;
    const phase = {
      idFase: parseInt(idFase),
    };
    response(res, true, deletePhase, phase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
