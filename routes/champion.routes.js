const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getChampions,
  createChampion,
  modifyChampion,
  eliminateChampion,
} = require("../controllers/champions.controller");

const router = Router();

router.get("/", auth, getChampions);
router.post("/", auth, createChampion);
router.put("/", auth, modifyChampion);
router.delete("/", auth, eliminateChampion);

module.exports = router;
