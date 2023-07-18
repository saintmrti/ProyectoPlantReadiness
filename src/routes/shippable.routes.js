import { Router } from "express";

import {
  createShippable,
  getShippables,
} from "../controllers/shippable.controller.js";

const router = Router();

router.get("/", getShippables);
router.post("/", createShippable);

export default router;
