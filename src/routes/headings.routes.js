import { Router } from "express";

import { getHeadings } from "../controllers/headings.controller.js";

const router = Router();

router.get("/", getHeadings);

export default router;
