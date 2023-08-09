const { Router } = require("express");

const { getShippables, createShippable } = require("../controllers/shippable.controller");

const router = Router();

router.get("/", getShippables);
router.post("/", createShippable);

module.exports = router;
