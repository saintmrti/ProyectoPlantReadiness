const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getPhases,
  createPhase,
  modifyPhase,
  deletePhase,
} = require("../controllers/phase.controller");

const router = Router();

router.get("/", auth, getPhases);
router.post("/", auth, createPhase);
router.put("/", auth, modifyPhase);
router.delete("/", auth, deletePhase);

module.exports = router;
