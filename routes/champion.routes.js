const { Router } = require("express");

const {
  getChampions,
  createChampion,
  modifyChampion,
  eliminateChampion,
} = require("../controllers/champions.controller");

const router = Router();

router.get("/", getChampions);
router.post("/", createChampion);
router.put("/", modifyChampion);
router.delete("/", eliminateChampion);

module.exports = router;
