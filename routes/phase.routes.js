const { Router } = require("express");

const {
  getPhases,
  createPhase,
  modifyPhase,
  deletePhase,
} = require("../controllers/phase.controller");

const router = Router();

router.get("/", getPhases);
router.post("/", createPhase);
router.put("/", modifyPhase);
router.delete("/", deletePhase);

module.exports = router;
