import { Router } from "express";

import {
  getMachines,
  createMachine,
} from "../controllers/machines.controller.js";

const router = Router();

router.get("/", getMachines);
router.post("/", createMachine);

export default router;
