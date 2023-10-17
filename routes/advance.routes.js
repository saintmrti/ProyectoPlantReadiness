const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getAdvances,
  createAdvance,
  modifyAdvance,
} = require("../controllers/advance.controller");

const router = Router();

router.get("/", auth, getAdvances);
router.post("/", auth, createAdvance);
router.put("/", auth, modifyAdvance);

module.exports = router;
