const _ = require("lodash");
const response = require("../helpers/response");

const {
  getSummary,
  insertExpectancy,
  updateExpectancy,
  deleteExpectancy,
} = require("../models/expectancy.model");

module.exports.getExpectancies = (req, res) => {
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

module.exports.createExpectancy = (req, res) => {
  try {
    const { expectancy, area, idProyecto } = req.body;
    const newRegister = {
      expectancy,
      area: parseInt(area),
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, insertExpectancy, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.modifyExpectancy = (req, res) => {
  try {
    const { expectancy, id } = req.body;
    const newRegister = {
      expectancy,
      idExpectativa: parseInt(id),
    };
    response(res, false, updateExpectancy, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.eliminateExpectancy = (req, res) => {
  try {
    const { idExpectativa } = req.query;
    const newRegister = {
      idExpectativa: parseInt(idExpectativa),
    };
    response(res, true, deleteExpectancy, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
