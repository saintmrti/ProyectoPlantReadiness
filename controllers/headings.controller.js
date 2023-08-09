const response = require("../helpers/response");
const { getSummary } = require("../models/headings.model");

module.exports.getHeadings = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
