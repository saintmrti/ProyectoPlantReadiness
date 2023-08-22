const { Router } = require("express");

const {
  getShippables,
  createShippable,
  modifyShippable,
} = require("../controllers/shippable.controller");

const router = Router();

router.get("/", getShippables);
router.post("/", createShippable);
router.put("/", modifyShippable);

module.exports = router;
