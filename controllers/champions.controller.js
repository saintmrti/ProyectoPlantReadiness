const response = require("../helpers/response");

const {
  getSummary,
  insertChampion,
  updateChampion,
  deleteChampion,
} = require("../models/champions.model");

module.exports.getChampions = (req, res) => {
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

module.exports.createChampion = (req, res) => {
  try {
    const { nombre, rubro, imagen, idProyecto } = req.body;
    const newChampion = {
      nombre,
      rubro,
      imagen,
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, insertChampion, newChampion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.modifyChampion = (req, res) => {
  try {
    const { nombre, rubro, imagen, id } = req.body;
    const newChampion = {
      nombre,
      rubro,
      imagen,
      idChampion: parseInt(id),
    };
    response(res, false, updateChampion, newChampion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.eliminateChampion = (req, res) => {
  try {
    const { idChampion } = req.query;
    const champion = {
      idChampion: parseInt(idChampion),
    };
    response(res, false, deleteChampion, champion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
