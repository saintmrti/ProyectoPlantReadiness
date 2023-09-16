const response = require("../helpers/response");
const { getSummary } = require("../models/kpis.model");

module.exports.getKpis = (req, res) => {
  try {
    const { phase, priority } = req.body;
    const newRegister = {
      phase,
      priority,
    };
    response(res, false, getSummary, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
