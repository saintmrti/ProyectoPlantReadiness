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

module.exports.modifyExpectancy = (req, res) => {
  try {
    const { expectancy, id } = req.body;
    const newRegister = {
      expectancy,
      idExpectativa: parseInt(id),
    };
    response(res, null, updateExpectancy, newRegister);
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
    response(res, null, deleteExpectancy, newRegister);
    // console.log(newRegister);
    // res.status(200).json({ message: "Expectancy deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
