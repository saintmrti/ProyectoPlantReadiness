const { Router } = require("express");

const {
  getAdvances,
  createAdvance,
  modifyAdvance,
} = require("../controllers/advance.controller");

const router = Router();

router.get("/", getAdvances);
router.post("/", createAdvance);
router.put("/", modifyAdvance);

module.exports = router;
