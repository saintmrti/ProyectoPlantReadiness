import { Router } from "express";

import {
  createShippable,
  getShippable,
} from "../controllers/shippable.controller.js";

const router = Router();

router.get("/", getShippable);
router.post("/", createShippable);

export default router;
