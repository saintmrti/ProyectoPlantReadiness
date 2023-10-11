const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const { getUsers, modifyUsers } = require("../controllers/users.controller");

const router = Router();

router.get("/", auth, getUsers);
router.put("/", auth, modifyUsers);

module.exports = router;
