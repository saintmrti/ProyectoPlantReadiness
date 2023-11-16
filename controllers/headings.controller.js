const response = require("../helpers/response");
const {
  getSummary,
  insertHeading,
  updateHeading,
  deleteHeading,
} = require("../models/headings.model");

module.exports.getHeadings = (req, res) => {
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

module.exports.createHeading = (req, res) => {
  try {
    const { name, idProyecto } = req.body;
    const newRegister = {
      name,
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, insertHeading, newRegister);
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
    response(res, false, updateHeading, newRegister);
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
    response(res, true, deleteHeading, deleteRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
