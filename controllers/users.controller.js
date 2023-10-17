const response = require("../helpers/response");

const { getSummary, updateUsers } = require("../models/users.model");

module.exports.getUsers = (req, res) => {
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

module.exports.modifyUsers = (req, res) => {
  try {
    const { users, idProyecto } = req.body;
    const newRegister = {
      users,
      idProyecto: parseInt(idProyecto),
    };
    console.log(newRegister);
    response(res, false, updateUsers, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
