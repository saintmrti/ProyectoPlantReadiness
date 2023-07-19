import { Router } from "express";

import { createPhase, getPhases } from "../controllers/phase.controller.js";

const router = Router();

router.get("/", getPhases);
router.post("/", createPhase);

export default router;
