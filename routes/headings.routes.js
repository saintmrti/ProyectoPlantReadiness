const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getHeadings,
  createHeading,
  modifyHeading,
  eliminateHeading,
} = require("../controllers/headings.controller");

const router = Router();

router.get("/", auth, getHeadings);
router.post("/", auth, createHeading);
router.put("/", auth, modifyHeading);
router.delete("/", auth, eliminateHeading);

module.exports = router;
