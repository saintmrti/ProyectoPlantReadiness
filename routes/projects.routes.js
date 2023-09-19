const { Router } = require("express");

const {
  getProjects,
  createProject,
} = require("../controllers/projects.controller");

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);

module.exports = router;
