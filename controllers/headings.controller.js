const response = require("../helpers/response");
const {
  getSummary,
  insertHeading,
  updateHeading,
  deleteHeading,
} = require("../models/headings.model");

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

module.exports.modifyHeading = (req, res) => {
  try {
    const { id, name } = req.body;
    const newRegister = {
      id: parseInt(id),
      name,
    };
    response(res, null, updateHeading, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.eliminateHeading = (req, res) => {
  try {
    const { idRubro } = req.query;
    const deleteRegister = {
      idRubro: parseInt(idRubro),
    };
    response(res, null, deleteHeading, deleteRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
