const { Router } = require("express");

const { getExpectancies, createExpectancy } = require("../controllers/expectancy.controller");

const router = Router();

router.get("/", getExpectancies);
router.post("/", createExpectancy);

module.exports = router;
