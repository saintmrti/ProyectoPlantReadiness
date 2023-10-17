const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getShippables,
  createShippable,
  modifyShippable,
  eliminateShippable,
} = require("../controllers/shippable.controller");
const router = Router();

router.get("/", auth, getShippables);
router.post("/", auth, createShippable);
router.put("/", auth, modifyShippable);
router.delete("/", auth, eliminateShippable);

module.exports = router;
