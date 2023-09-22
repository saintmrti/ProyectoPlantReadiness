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
import Avatar from "@mui/material/Avatar";

import { ProjectBar } from "../ProgressBar/ProjectBar";

const ProjectsTable = ({
  handleClickProject,
  list,
  handleClickEditProject,
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
          <Tooltip title="Agregar proyecto">
            <IconButton onClick={handleClickProject}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {/* <TableCell><b>ID</b></TableCell> */}
                <TableCell>
                  <b>Insignia</b>
                </TableCell>
                <TableCell>
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="center">
                  <b>Id</b>
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
                  <TableCell>
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      alt={item.nombre}
                      src={item.icono}
                    />
                  </TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell align="center">{item.idProyecto}</TableCell>
                  <TableCell align="center">130/260</TableCell>
                  <TableCell align="center">
                    <ProjectBar percentage={50} />
                  </TableCell>
                  {/* <TableCell>{item.planta}</TableCell>
                                    <TableCell>{item.c_url}</TableCell> */}
                  <TableCell width={140}>
                    <Tooltip title="Ir al proyecto">
                      <IconButton
                        aria-label="Registrar"
                        onClick={() => handleClickNav(item.id)}
                      >
                        <ExitToAppIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label="Editar"
                        onClick={() => handleClickEditProject(item.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton aria-label="Eliminar" onClick={(f) => f}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
