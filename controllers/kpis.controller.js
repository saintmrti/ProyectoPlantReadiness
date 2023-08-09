const response = require("../helpers/response");
const { getSummary } = require("../models/kpis.model");

module.exports.getKpis = (req, res) => {
  try {
    const { phase, priority, weighting } = req.body;
    const newRegister = {
      phase,
      priority,
      weighting,
    };
    response(res, null, getSummary, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
