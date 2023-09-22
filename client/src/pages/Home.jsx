import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ProjectsTable from "../components/Tables/ProjectsTable";
import { fetchProjectsRequest } from "../slices/projects";
import { ProjectsForm } from "../components/Forms/ProjectsForm";
// import ProjectForm from "../components/Forms/ProjectForm";

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

const Home = () => {
  const dispatch = useDispatch();
  const { list: projects } = useSelector((state) => state.projects);

  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleClickProject = () => {
    setOpen(true);
    setEditProject(null);
  };

  const handleClickEditProject = (id) => {
    setOpen(true);
    setEditProject(id);
  };

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);

  return (
    <>
      <ProjectsTable
        list={projects}
        handleClickProject={handleClickProject}
        handleClickEditProject={handleClickEditProject}
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
    </>
    // <div
    //   className="w-full flex justify-center items-center"
    //   style={{ height: "calc(100vh - 65px)" }}
    // >
    //   <Card
    //     sx={{
    //       padding: 2,
    //       width: "500px",
    //       height: "500px",
    //       position: "relative",
    //       display: "flex",
    //       flexDirection: "column",
    //     }}
    //   >
    //     <h1 className="text-2xl font-bold text-center">
    //       {addProject === 0
    //         ? "Plant Readiness"
    //         : addProject === 1
    //         ? "Proyectos"
    //         : "Nuevo Proyecto"}
    //     </h1>
    //     {addProject === 0 ? (
    //       <div className="flex flex-col items-center justify-center h-full">
    //         <Button
    //           variant="contained"
    //           onClick={() => setAddProject(1)}
    //           sx={{ marginBottom: 2, width: "200px" }}
    //         >
    //           Ver Proyectos
    //         </Button>
    //         <Button
    //           sx={{ width: "200px" }}
    //           variant="contained"
    //           onClick={() => setAddProject(2)}
    //         >
    //           Agregar Proyecto
    //         </Button>
    //       </div>
    //     ) : (
    //       <div className="flex flex-col items-center justify-center h-full">
    //         {addProject === 1 ? (
    //           <div className="flex flex-col items-center justify-center">
    //             {_.map(projects, (item) => (
    //               <Button
    //                 key={item.id}
    //                 variant="contained"
    //                 onClick={() => navigate(`/proyectos/${item.id}/registro`)}
    //                 sx={{ marginBottom: 2, width: "100%" }}
    //               >
    //                 {item.nombre}
    //               </Button>
    //             ))}
    //           </div>
    //         ) : (
    //           <ProjectForm isFetching={isFetchingInsert} />
    //         )}
    //         <button
    //           onClick={() => setAddProject(0)}
    //           style={{
    //             position: "absolute",
    //             bottom: 5,
    //             left: 10,
    //             color: "red",
    //             fontSize: "0.8rem",
    //           }}
    //         >
    //           VOLVER
    //         </button>
    //       </div>
    //     )}
    //   </Card>
    // </div>
  );
};

export default Home;
