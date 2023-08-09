const { Router } = require("express");

const { getAdvances, createAdvance } = require("../controllers/advance.controller");

const router = Router();

router.get("/", getAdvances);
router.post("/", createAdvance);

module.exports = router;
