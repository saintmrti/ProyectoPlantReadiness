import { Router } from "express";

import {
  createExpectancy,
  getExpectancy,
} from "../controllers/expectancy.controller.js";

const router = Router();

router.get("/", getExpectancy);
router.post("/", createExpectancy);

export default router;
