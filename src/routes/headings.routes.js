import { Router } from "express";

import { getItems } from "../controllers/headings.controller.js";

const router = Router();

router.get("/", getItems);

export default router;
