import { Router } from "express";

import {
  createShippable,
  getShippable,
} from "../controllers/shippable.controller.js";

const router = Router();

router.get("/entregables", getShippable);
router.post("/entregables", createShippable);

export default router;
