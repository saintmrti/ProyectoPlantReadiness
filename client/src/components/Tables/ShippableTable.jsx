import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import _ from "lodash";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(() => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ShippableTable = ({
  data,
  fases,
  advance,
  activeComment,
  idExpectancy,
  handleOnClickAdv,
  handleOnClickEditShi,
  handleOnClickEditAdv,
  handleOnClickDeleteShi,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex(
      (prevIndex) => {
        const ids = Object.keys(fases);
        const currentIndex = ids.indexOf(String(prevIndex));
        const nextIndex = (currentIndex + 1) % ids.length;
        return parseInt(ids[nextIndex]);
      }
      // prevIndex === _.size(fases) ? 1 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => {
        const ids = Object.keys(fases);
        const currentIndex = _.findIndex(ids, (id) => id === String(prevIndex));
        const backIndex =
          currentIndex === 0 ? ids.length - 1 : currentIndex - 1;
        return parseInt(ids[backIndex]);
      }
      // prevIndex === 1 ? _.size(fases) : prevIndex - 1
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            {!activeComment && (
              <TableRow>
                <StyledTableCell colSpan={2}></StyledTableCell>
                <StyledTableCell colSpan={7} sx={{ textAlign: "center" }}>
                  <div className="flex items-center">
                    <div className="mx-auto">
                      {`${fases[activeIndex]?.fase} - ${fases[activeIndex]?.maquina}`}
                    </div>
                    <div>
                      <IconButton
                        aria-label="back"
                        size="small"
                        onClick={() => handlePrev(idExpectancy.id)}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <IconButton
                        aria-label="forward"
                        size="small"
                        onClick={() => handleNext(idExpectancy.id)}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </div>
                  </div>
                </StyledTableCell>
              </TableRow>
            )}
            <TableRow>
              <StyledTableCell sx={{ width: "2.5rem" }}>#</StyledTableCell>
              <StyledTableCell>Entregable</StyledTableCell>
              {activeComment ? (
                <>
                  <StyledTableCell>Evidencia</StyledTableCell>
                  <StyledTableCell align="center">Prioridad</StyledTableCell>
                  {/* <StyledTableCell align="center">Ponderación</StyledTableCell> */}
                  <StyledTableCell align="center">Comentarios</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </>
              ) : (
                <>
                  <StyledTableCell>Responsable</StyledTableCell>
                  <StyledTableCell align="center">Fecha Inicio</StyledTableCell>
                  <StyledTableCell align="center">
                    Fecha Termino
                  </StyledTableCell>
                  <StyledTableCell align="center">Fecha Real</StyledTableCell>
                  <StyledTableCell align="center">Avance</StyledTableCell>
                  <StyledTableCell align="center" sx={{ minWidth: "300px" }}>
                    Comentarios
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(data, (item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell
                  sx={{ width: "2.5rem" }}
                  component="th"
                  scope="row"
                  align="center"
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{item.nombre}</StyledTableCell>
                {activeComment ? (
                  <>
                    <StyledTableCell>{item.evidencia}</StyledTableCell>
                    <StyledTableCell align="center">
                      {item.prioridad}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      {item.ponderacion}
                    </StyledTableCell> */}
                    <StyledTableCell>{item.comentarios}</StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => handleOnClickAdv(item.id)}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => handleOnClickEditShi(item.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleOnClickDeleteShi(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </StyledTableCell>
                  </>
                ) : (
                  <>
                    {advance &&
                    advance[item.id] &&
                    advance[item.id].length > 0 ? (
                      <>
                        <StyledTableCell>
                          {
                            advance[item.id].find(
                              (obj) =>
                                obj.idMaquina === fases[activeIndex]?.idMaquina
                            )?.responsable
                          }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {
                            advance[item.id].find(
                              (obj) =>
                                obj.idMaquina === fases[activeIndex]?.idMaquina
                            )?.fecha_inicio
                          }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {
                            advance[item.id].find(
                              (obj) =>
                                obj.idMaquina === fases[activeIndex]?.idMaquina
                            )?.fecha_termino
                          }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {
                            advance[item.id].find(
                              (obj) =>
                                obj.idMaquina === fases[activeIndex]?.idMaquina
                            )?.fecha_real
                          }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {
                            advance[item.id].find(
                              (obj) =>
                                obj.idMaquina === fases[activeIndex]?.idMaquina
                            )?.avance
                          }
                        </StyledTableCell>
                        <StyledTableCell>
                          {
                            advance[item.id].find(
                              (obj) =>
                                obj.idMaquina === fases[activeIndex]?.idMaquina
                            )?.comentarios
                          }
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() =>
                              handleOnClickEditAdv(
                                advance[item.id].find(
                                  (obj) =>
                                    obj.idMaquina ===
                                    fases[activeIndex]?.idMaquina
                                )?.id
                              )
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </StyledTableCell>
                      </>
                    ) : (
                      <>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </>
                    )}
                  </>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShippableTable;
