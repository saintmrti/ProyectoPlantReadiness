const { Router } = require("express");

const {
  getMachines,
  createMachine,
  eliminateMachine,
} = require("../controllers/machines.controller");

const router = Router();

router.get("/", getMachines);
router.post("/", createMachine);
router.delete("/", eliminateMachine);

module.exports = router;
