const response = require("../helpers/response");
const { getSummary } = require("../models/logs.model");

module.exports.getLogs = (req, res) => {
  try {
    const { idProyecto } = req.query;
    const newRegister = {
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, getSummary, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
