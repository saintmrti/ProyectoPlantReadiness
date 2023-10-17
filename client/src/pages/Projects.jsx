import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ProjectsTable from "../components/Tables/ProjectsTable";
import { fetchProjectsRequest } from "../slices/projects";
import { fetchUsersRequest } from "../slices/users";
import { summaryProjects } from "../selectors/projects";
import { ProjectsForm } from "../components/Forms/ProjectsForm";
import { ProjectsAlert } from "../components/Alert/ProjectsAlert";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Projects = () => {
  const dispatch = useDispatch();
  const { isFetching, didError } = useSelector((state) => state.projects);
  const projects = useSelector(summaryProjects);
  const { tokenData } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);

  const handleClickProject = () => {
    setOpen(true);
    setEditProject(null);
  };

  const handleClickEditProject = (id) => {
    setOpen(true);
    setEditProject(id);
  };

  const handleDeleteProject = (id) => {
    setOpenAlert(true);
    setDeleteProject(id);
  };

  useEffect(() => {
    dispatch(fetchProjectsRequest());
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <Error />
      ) : (
        <>
          <ProjectsTable
            list={projects}
            handleClickProject={handleClickProject}
            handleClickEditProject={handleClickEditProject}
            handleDeleteProject={handleDeleteProject}
            tokenData={tokenData}
          />
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <ProjectsForm editProject={editProject} setOpen={setOpen} />
            </Box>
          </Modal>
          <ProjectsAlert
            open={openAlert}
            onClose={() => setOpenAlert(false)}
            deleteProject={deleteProject}
            setDeleteProject={setDeleteProject}
          />
        </>
      )}
    </>
  );
};

export default Projects;
