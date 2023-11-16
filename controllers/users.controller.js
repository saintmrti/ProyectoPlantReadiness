const response = require("../helpers/response");

const { getSummary, updateUsers } = require("../models/users.model");

module.exports.getUsers = (req, res) => {
  try {
    response(res, false, getSummary);
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
    response(res, false, updateUsers, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
