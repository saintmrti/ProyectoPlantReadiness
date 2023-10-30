import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ProjectBar } from "../ProgressBar/ProjectBar";
import { Fragment } from "react";

const ProjectsTable = ({
  handleClickProject,
  list,
  handleClickEditProject,
  handleDeleteProject,
  tokenData,
}) => {
  const navigate = useNavigate();
  const handleClickNav = (id) => {
    navigate(`/proyectos/${id}/registro`);
  };
  return (
    <Box sx={{ height: "calc(100vh - 24px)" }}>
      <Paper sx={{ width: "100%", height: "100%", mb: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Proyectos
          </Typography>
          {tokenData?.n_pr === 2 && (
            <Tooltip title="Agregar proyecto">
              <IconButton onClick={handleClickProject}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer sx={{ maxHeight: "calc(100% - 64px)" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* <TableCell><b>ID</b></TableCell> */}
                <TableCell>
                  <b>Adi</b>
                </TableCell>
                <TableCell>
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="center">
                  <b>Entregables</b>
                </TableCell>
                <TableCell align="center">
                  <b>Avance</b>
                </TableCell>
                {/* <TableCell><b>Planta</b></TableCell>
                <TableCell><b>URL Proyecto</b></TableCell> */}
                <TableCell align="center">
                  <b>Acciones</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(list, (item) => (
                <TableRow key={item.id}>
                  {/* <TableCell>{item.idProyecto}</TableCell> */}
                  <TableCell>{item?.adi}</TableCell>
                  <TableCell>{item?.nombre}</TableCell>
                  <TableCell align="center">
                    {item && item.Plan > 0
                      ? item?.Real + "/" + item?.Plan
                      : "0/0"}
                  </TableCell>
                  <TableCell align="center">
                    <ProjectBar
                      percentage={
                        item && item.Plan > 0
                          ? parseFloat(
                              ((item?.Real * 100) / item?.Plan).toFixed(1)
                            )
                          : 0
                      }
                    />
                  </TableCell>
                  {/* <TableCell>{item.planta}</TableCell>
                                    <TableCell>{item.c_url}</TableCell> */}
                  <TableCell width={140} align="center">
                    <Tooltip title="Ir al proyecto">
                      <IconButton
                        aria-label="Registrar"
                        onClick={() => handleClickNav(item.id)}
                      >
                        <ExitToAppIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {tokenData?.n_pr === 2 && (
                      <Fragment>
                        <Tooltip title="Editar">
                          <IconButton
                            aria-label="Editar"
                            onClick={() => handleClickEditProject(item.id)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            aria-label="Eliminar"
                            onClick={() => handleDeleteProject(item.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Fragment>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ProjectsTable;
