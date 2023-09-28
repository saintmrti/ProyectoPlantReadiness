const _ = require("lodash");
const response = require("../helpers/response");
const {
  insertMachine,
  getSummary,
  deleteMachine,
} = require("../models/machines.model");

module.exports.getMachines = (req, res) => {
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

module.exports.createMachine = (req, res) => {
  try {
    const { selectedMachines, idFase, idProyecto } = req.body;
    const newMachines = _.map(selectedMachines, (machine) => {
      return {
        machine,
        idFase,
        idProyecto: parseInt(idProyecto),
      };
    });
    console.log(newMachines);
    response(res, false, insertMachine, newMachines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.eliminateMachine = (req, res) => {
  try {
    const { idMaquina } = req.query;
    const deleteRegister = {
      idMaquina: parseInt(idMaquina),
    };
    response(res, false, deleteMachine, deleteRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
