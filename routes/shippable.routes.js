const { Router } = require("express");

const {
  getShippables,
  createShippable,
  modifyShippable,
  eliminateShippable,
} = require("../controllers/shippable.controller");
const router = Router();

router.get("/", getShippables);
router.post("/", createShippable);
router.put("/", modifyShippable);
router.delete("/", eliminateShippable);

module.exports = router;
