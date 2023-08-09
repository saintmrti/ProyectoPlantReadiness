const { Router } = require("express");

const { getMachines, createMachine } = require("../controllers/machines.controller");

const router = Router();

router.get("/", getMachines);
router.post("/", createMachine);

module.exports = router;
