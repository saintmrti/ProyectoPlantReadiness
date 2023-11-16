const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const { getLogs } = require("../controllers/logs.controller");

const router = Router();

router.get("/", auth, getLogs);

module.exports = router;
