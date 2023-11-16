const response = require("../helpers/response");

const {
  getSummary,
  insertProject,
  updateProject,
  deleteProject,
} = require("../models/projects.model");

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
    const { nombre, adi, idPlantilla } = req.body;
    const newProject = {
      nombre,
      adi: parseInt(adi),
      idPlantilla,
    };
    response(res, true, insertProject, newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.modifyProject = (req, res) => {
  try {
    const { id, nombre, adi } = req.body;
    const project = {
      id: parseInt(id),
      nombre,
      adi: parseInt(adi),
    };
    response(res, false, updateProject, project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deleteProject = (req, res) => {
  try {
    const { idProyecto } = req.query;
    const project = {
      idProyecto: parseInt(idProyecto),
    };
    response(res, true, deleteProject, project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
