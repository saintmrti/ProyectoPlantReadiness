const { Router } = require("express");

const {
  getHeadings,
  createHeading,
  modifyHeading,
  eliminateHeading,
} = require("../controllers/headings.controller");

const router = Router();

router.get("/", getHeadings);
router.post("/", createHeading);
router.put("/", modifyHeading);
router.delete("/", eliminateHeading);

module.exports = router;
