import { Router } from "express";

import {
  createAdvance,
  getAdvance,
} from "../controllers/advance.controller.js";

const router = Router();

router.get("/", getAdvance);
router.post("/", createAdvance);

export default router;
