const response = require("../helpers/response");
const { getSummary, insertExpectancy } = require("../models/expectancy.model");

module.exports.getExpectancies = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createExpectancy = (req, res) => {
  try {
    const { expectancy, area } = req.body;
    const newRegister = {
      expectancy,
      area: parseInt(area),
    };
    response(res, null, insertExpectancy, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
