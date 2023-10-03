const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const { getKpis } = require("../controllers/kpis.controller");

const router = Router();

router.post("/", auth, getKpis);

module.exports = router;
