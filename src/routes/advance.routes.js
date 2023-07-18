import { Router } from "express";

import {
  createAdvance,
  getAdvances,
} from "../controllers/advance.controller.js";

const router = Router();

router.get("/", getAdvances);
router.post("/", createAdvance);

export default router;
