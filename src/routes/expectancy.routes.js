import { Router } from "express";

import {
  createExpectancy,
  getExpectancy,
} from "../controllers/expectancy.controller.js";

const router = Router();

router.get("/expectativas", getExpectancy);
router.post("/expectativas", createExpectancy);

export default router;
