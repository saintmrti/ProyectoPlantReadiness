import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const LogsTable = ({ idProyecto, list }) => {
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
            Backlog Avances Entregables
          </Typography>
          <Tooltip title="Ir al registro">
            <IconButton
              onClick={() => navigate(`/proyectos/${idProyecto}/registro`)}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer sx={{ maxHeight: "calc(100% - 64px)" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Entregable</b>
                </TableCell>
                <TableCell>
                  <b>Usuario</b>
                </TableCell>
                <TableCell align="center">
                  <b>Avance</b>
                </TableCell>
                <TableCell align="center">
                  <b>Última Fecha Inicio</b>
                </TableCell>
                <TableCell align="center">
                  <b>Última Fecha Fin</b>
                </TableCell>
                <TableCell align="center">
                  <b>Última Fecha Real</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(list, (item) => (
                <TableRow key={item.id}>
                  <TableCell>{item?.entregable}</TableCell>
                  <TableCell>{item?.usuario}</TableCell>
                  <TableCell align="center">{`${item?.fase} - ${item?.maquina}`}</TableCell>
                  <TableCell align="center">
                    {`${item?.ult_FechaInicio} (${item?.cont_FechaInicio})`}
                  </TableCell>
                  <TableCell align="center">
                    {`${item?.ult_FechaFin} (${item?.cont_FechaFin})`}
                  </TableCell>
                  <TableCell align="center">
                    {`${item?.ult_FechaReal} (${item?.cont_FechaReal})`}
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

export default LogsTable;
