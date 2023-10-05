const response = require("../helpers/response");
const { getSummary } = require("../models/kpis.model");

module.exports.getKpis = (req, res) => {
  try {
    const { phase, priority, idProyecto } = req.body;
    const newRegister = {
      phase,
      priority,
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, getSummary, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
