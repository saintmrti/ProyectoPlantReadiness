const response = require("../helpers/response");
const { insertMachine, getSummary } = require("../models/machines.model");

module.exports.getMachines = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createMachine = (req, res) => {
  try {
    const { machine } = req.body;
    const newRegister = {
      machine,
    };
    response(res, null, insertMachine, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
