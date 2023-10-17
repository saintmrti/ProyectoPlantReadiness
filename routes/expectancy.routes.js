const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getExpectancies,
  createExpectancy,
  modifyExpectancy,
  eliminateExpectancy,
} = require("../controllers/expectancy.controller");

const router = Router();

router.get("/", auth, getExpectancies);
router.post("/", auth, createExpectancy);
router.put("/", auth, modifyExpectancy);
router.delete("/", auth, eliminateExpectancy);

module.exports = router;
