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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";

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

  const handleSelectClick = (event, itemId, isManager, isReading) => {
    if (isManager) return;
    if (isReading) return;
    const selectedIndex = selectedItems.indexOf(itemId);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, itemId);
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
          if (prevState.includes(item.id)) {
            return prevState;
          } else {
            return [...prevState, item.id];
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
                  <b>Acceso</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(list, (item) => {
                const isItemSelected = selectedItems.indexOf(item.id) !== -1;
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
