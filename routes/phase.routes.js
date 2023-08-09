const { Router } = require("express");

const { getPhases, createPhase } = require("../controllers/phase.controller");

const router = Router();

router.get("/", getPhases);
router.post("/", createPhase);

module.exports = router;
