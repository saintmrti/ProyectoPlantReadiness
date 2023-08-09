const { Router } = require("express");

const { getKpis } = require("../controllers/kpis.controller");

const router = Router();

router.post("/", getKpis);

module.exports = router;
