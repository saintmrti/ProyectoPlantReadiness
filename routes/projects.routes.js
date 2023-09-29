const { Router } = require("express");

const {
  getProjects,
  createProject,
  modifyProject,
  deleteProject,
} = require("../controllers/projects.controller");

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.put("/", modifyProject);
router.delete("/", deleteProject);

module.exports = router;
