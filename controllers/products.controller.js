const response = require("../helpers/response");

const {
  getSummary,
  insertProducts,
  updateProducts,
  deleteProducts,
} = require("../models/products.model");

module.exports.getProducts = (req, res) => {
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

module.exports.createProducts = (req, res) => {
  try {
    const { products, maquina, idProyecto } = req.body;
    const newProducts = {
      products,
      maquina,
      idProyecto: parseInt(idProyecto),
    };
    console.log(newProducts);
    response(res, false, insertProducts, newProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.modifyProducts = (req, res) => {
  try {
    const { products, maquina, idMaquina, idProyecto } = req.body;
    const newProducts = {
      products,
      maquina,
      idMaquina: parseInt(idMaquina),
      idProyecto: parseInt(idProyecto),
    };
    response(res, false, updateProducts, newProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.eliminateProducts = (req, res) => {
  try {
    const { idMaquina } = req.query;
    const deleteRegister = {
      idMaquina: parseInt(idMaquina),
    };
    response(res, false, deleteProducts, deleteRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
