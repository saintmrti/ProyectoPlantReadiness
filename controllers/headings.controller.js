const response = require("../helpers/response");
const { getSummary, insertHeading } = require("../models/headings.model");

module.exports.getHeadings = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createHeading = (req, res) => {
  try {
    const { name } = req.body;
    const newRegister = {
      name,
    };
    response(res, null, insertHeading, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
