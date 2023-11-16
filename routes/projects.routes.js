const { Router } = require("express");
const { auth } = require("../middlewares/auth");

const {
  getProjects,
  createProject,
  modifyProject,
  deleteProject,
} = require("../controllers/projects.controller");

const router = Router();

router.get("/", auth, getProjects);
router.post("/", auth, createProject);
router.put("/", auth, modifyProject);
router.delete("/", auth, deleteProject);

module.exports = router;
