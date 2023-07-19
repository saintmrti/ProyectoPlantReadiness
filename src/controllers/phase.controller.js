import response from "../helpers/response.js";
import { insertPhase, getSummary } from "../models/phase.model.js";
import _ from "lodash";

export const getPhases = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPhase = (req, res) => {
  try {
    const { newPhases } = req.body;

    const modifiedArray = _.map(newPhases, (item) => {
      return {
        idMaquina: parseInt(item.idMaquina),
        idGrupo: item.idGrupo,
        fase: item.fase,
      };
    });
    response(res, null, insertPhase, modifiedArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
