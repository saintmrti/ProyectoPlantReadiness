import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

const UsersTable = ({ list, idProyecto, handleOnClickUsers }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelectedItems = list.map((item) => item.id);
  //     setSelectedItems(newSelectedItems);
  //   } else {
  //     setSelectedItems([]);
  //   }
  // };

  const handleAllowClick = (itemId, isManager, isReading) => {
    if (isManager) return;
    if (isReading) return;
    const updatedList = selectedItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          n_activo: !item.n_activo, // Cambia el valor de n_activo a su opuesto
        };
      }
      return item;
    });
    // Aquí podrías llamar a una función para manejar los datos actualizados o ejecutar otra lógica necesaria
    setSelectedItems(updatedList);
  };

  const handleSelectClick = (event, itemId, isManager, isReading) => {
    if (isManager) return;
    if (isReading) return;
    const selectedIndex = selectedItems.findIndex((item) => item.id === itemId);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, {
        id: itemId,
        n_activo: false,
      });
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  useEffect(() => {
    setSelectedItems([]);
    _.map(list, (item) => {
      if (item.access && !item.gerente && !item.lectura) {
        setSelectedItems((prevState) => {
          const selectedItem = { id: item.id, n_activo: item.n_activo };
          if (prevState.some((prevItem) => prevItem.id === item.id)) {
            return prevState;
          } else {
            return [...prevState, selectedItem];
          }
        });
      }
    });
  }, [list]);

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
            Acceso Champions
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOnClickUsers(selectedItems)}
            sx={{ mr: 1 }}
          >
            Guardar
          </Button>
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
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    color="primary"
                    indeterminate={
                      selectedItems.length > 0 &&
                      selectedItems.length < list.length
                    }
                    checked={selectedItems.length === list.length}
                    onChange={handleSelectAllClick}
                  /> */}
                </TableCell>
                <TableCell>
                  <b>Nombre</b>
                </TableCell>
                <TableCell>
                  <b>Nivel</b>
                </TableCell>
                <TableCell align="center">
                  <b>Gerente</b>
                </TableCell>
                <TableCell align="center">
                  <b>Pilar</b>
                </TableCell>
                <TableCell align="center">
                  <b>Solo Lectura</b>
                </TableCell>
                <TableCell align="center">
                  <b>Fecha</b>
                </TableCell>
                <TableCell align="center">
                  <b>Acceso</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(list, (item) => {
                const isItemSelected = selectedItems.some(
                  (selectedItem) => selectedItem.id === item.id
                );
                return (
                  <TableRow key={item.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={
                          isItemSelected || item?.gerente || item?.lectura
                        }
                        onChange={(event) =>
                          handleSelectClick(
                            event,
                            item.id,
                            item?.gerente,
                            item?.lectura
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.rol}</TableCell>
                    <TableCell align="center">
                      {item?.gerente ? <CheckIcon /> : <div></div>}
                    </TableCell>
                    <TableCell align="center">
                      {item?.pilar ? <CheckIcon /> : <div></div>}
                    </TableCell>
                    <TableCell align="center">
                      {item?.lectura ? <CheckIcon /> : <div></div>}
                    </TableCell>
                    <TableCell align="center">
                      {item.gerente ? (
                        <IconButton size="small" color="success">
                          <CheckIcon />
                        </IconButton>
                      ) : item.lectura ? (
                        <IconButton size="small" color="error">
                          <BlockIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          color={
                            selectedItems.find(
                              (selectedItem) => selectedItem.id === item.id
                            )?.n_activo
                              ? "success"
                              : "error"
                          }
                          onClick={() =>
                            handleAllowClick(
                              item.id,
                              item.gerente,
                              item.lectura
                            )
                          }
                        >
                          {selectedItems.find(
                            (selectedItem) => selectedItem.id === item.id
                          )?.n_activo ? (
                            <CheckIcon />
                          ) : (
                            <BlockIcon />
                          )}
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {item.access ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UsersTable;
