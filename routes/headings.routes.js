const { Router } = require("express");

const {
  getHeadings,
  createHeading,
} = require("../controllers/headings.controller");

const router = Router();

router.get("/", getHeadings);
router.post("/", createHeading);

module.exports = router;
