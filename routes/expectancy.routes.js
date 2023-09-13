const { Router } = require("express");

const {
  getExpectancies,
  createExpectancy,
  modifyExpectancy,
  eliminateExpectancy,
} = require("../controllers/expectancy.controller");

const router = Router();

router.get("/", getExpectancies);
router.post("/", createExpectancy);
router.put("/", modifyExpectancy);
router.delete("/", eliminateExpectancy);

module.exports = router;
