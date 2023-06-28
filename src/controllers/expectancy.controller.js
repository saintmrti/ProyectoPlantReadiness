import response from "../helpers/response.js";
import { insertExpectancy, getSummary } from "../models/expectancy.model.js";

export const getExpectancy = (req, res) => {
  try {
    response(res, null, getSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createExpectancy = (req, res) => {
  const { expectancy, area } = req.body;
  try {
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
