import { Router } from "express";

import { getKpis } from "../controllers/kpis.controller.js";

const router = Router();

router.post("/", getKpis);

export default router;
