import { Router } from "express";

import {
  createExpectancy,
  getExpectancies,
} from "../controllers/expectancy.controller.js";

const router = Router();

router.get("/", getExpectancies);
router.post("/", createExpectancy);

export default router;
