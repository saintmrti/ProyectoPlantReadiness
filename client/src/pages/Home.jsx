import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { fetchProjectsRequest } from "../slices/projects";
import ProjectForm from "../components/Forms/ProjectForm";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: projects, isFetchingInsert } = useSelector(
    (state) => state.projects
  );

  const [addProject, setAddProject] = useState(0);

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);

  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <Card
        sx={{
          padding: 2,
          width: "400px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <h1 className="text-2xl font-bold text-center">
          {addProject === 0
            ? "Plant Readiness"
            : addProject === 1
            ? "Proyectos"
            : "Nuevo Proyecto"}
        </h1>
        {addProject === 0 ? (
          <div className="flex flex-col items-center justify-center h-80">
            <Button
              variant="contained"
              onClick={() => setAddProject(1)}
              sx={{ width: "100%", marginBottom: 2 }}
            >
              Ver Proyectos
            </Button>
            <Button
              variant="contained"
              onClick={() => setAddProject(2)}
              sx={{ width: "100%" }}
            >
              Agregar Proyecto
            </Button>
          </div>
        ) : (
          <div>
            {addProject === 1 ? (
              <div className="flex flex-col items-center justify-center h-80">
                <div className="flex flex-col items-center justify-center">
                  {_.map(projects, (item) => (
                    <Button
                      key={item.idProyecto}
                      variant="contained"
                      onClick={() =>
                        navigate(`/proyectos/${item.idProyecto}/registro`)
                      }
                      sx={{ width: "100%", marginBottom: 2 }}
                    >
                      {item.nombre}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <ProjectForm isFetching={isFetchingInsert} />
            )}
            <button
              onClick={() => setAddProject(0)}
              style={{
                position: "absolute",
                bottom: 5,
                left: 10,
                color: "red",
                fontSize: "0.8rem",
              }}
            >
              VOLVER
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Home;
