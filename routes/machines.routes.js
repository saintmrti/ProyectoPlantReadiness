const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getMachines,
  createMachine,
  eliminateMachine,
} = require("../controllers/machines.controller");

const router = Router();

router.get("/", auth, getMachines);
router.post("/", auth, createMachine);
router.delete("/", auth, eliminateMachine);

module.exports = router;
