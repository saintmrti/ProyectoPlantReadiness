import { Router } from "express";

import { getMachines } from "../controllers/machines.controller.js";

const router = Router();

router.get("/", getMachines);

export default router;
