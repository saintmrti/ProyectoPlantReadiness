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

// const list = [
//   {
//     id: 1,
//     img: "$$$",
//     nombre: "Proyecto 1",
//     rubro: "Rubro 1",
//   },
//   {
//     id: 2,
//     img: "$$$",
//     nombre: "Proyecto 2",
//     rubro: "Rubro 2",
//   },
//   {
//     id: 3,
//     img: "$$$",
//     nombre: "Proyecto 3",
//     rubro: "Rubro 3",
//   },
// ];

const ChampionsTable = ({
  list,
  handleClickCham,
  handleEditCham,
  idProyecto,
}) => {
  const navigate = useNavigate();
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
            Champions Pilares
          </Typography>
          <div className="flex justify-center items-center mr-5">
            <Tooltip title="Agregar champion">
              <IconButton onClick={handleClickCham}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ir al dashboard">
              <IconButton
                onClick={() => navigate(`/proyectos/${idProyecto}/dashboard`)}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {/* <TableCell><b>ID</b></TableCell> */}
                <TableCell>
                  <b>Icono</b>
                </TableCell>
                <TableCell>
                  <b>Nombre</b>
                </TableCell>
                <TableCell>
                  <b>Rubro</b>
                </TableCell>
                {/* <TableCell><b>Planta</b></TableCell>
                <TableCell><b>URL Proyecto</b></TableCell> */}
                <TableCell>
                  <b>Acciones</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(list, (item) => (
                <TableRow
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={item.id}
                >
                  {/* <TableCell>{item.idProyecto}</TableCell> */}
                  <TableCell>
                    <Avatar
                      alt={item.nombre}
                      src={item.imagen}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.rubro}</TableCell>
                  {/* <TableCell>{item.planta}</TableCell>
                  <TableCell>{item.c_url}</TableCell> */}
                  <TableCell width={120}>
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label="Editar"
                        onClick={() => handleEditCham(item.id)}
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

export default ChampionsTable;
