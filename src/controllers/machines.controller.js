import response from "../helpers/response.js";
import { getSummary, insertMachine } from "../models/machines.model.js";

export const getMachines = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createMachine = (req, res) => {
  try {
    const { machine } = req.body;
    const newRegister = {
      machine,
    };
    response(res, null, insertMachine, newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
