const response = require("../helpers/response");

const { getSummary, insertProject } = require("../models/projects.model");

module.exports.getProjects = (req, res) => {
  try {
    response(res, false, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createProject = (req, res) => {
  try {
    const { nombre } = req.body;
    const newProject = {
      nombre,
    };
    response(res, false, insertProject, newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
