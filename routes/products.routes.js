const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getProducts,
  createProducts,
  modifyProducts,
  eliminateProducts,
} = require("../controllers/products.controller");

const router = Router();

router.get("/", auth, getProducts);
router.post("/", auth, createProducts);
router.put("/", auth, modifyProducts);
router.delete("/", auth, eliminateProducts);

module.exports = router;
