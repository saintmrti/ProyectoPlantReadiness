import response from "../helpers/response.js";
import { getSummary } from "../models/machines.model.js";

export const getMachines = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
