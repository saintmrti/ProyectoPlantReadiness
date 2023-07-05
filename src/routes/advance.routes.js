import { Router } from "express";

import {
  createAdvance,
  getAdvanceByIdEntregable,
} from "../controllers/advance.controller.js";

const router = Router();

router.get("/avances", getAdvanceByIdEntregable);
router.post("/avances", createAdvance);

export default router;
