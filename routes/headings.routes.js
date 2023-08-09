const { Router } = require("express");

const { getHeadings } = require("../controllers/headings.controller");

const router = Router();

router.get("/", getHeadings);

module.exports = router;
