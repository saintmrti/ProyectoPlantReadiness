import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import _ from "lodash";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
  activeIndex,
  advance,
  activeComment,
}) => {
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
                <StyledTableCell colSpan={5}></StyledTableCell>
                <StyledTableCell colSpan={6} sx={{ textAlign: "center" }}>
                  {`${fases[activeIndex]?.fase} - ${fases[activeIndex]?.maquina}`}
                  {/* {fases[activeIndex]?.fase}
                  <br />
                  {fases[activeIndex]?.maquina} */}
                </StyledTableCell>
              </TableRow>
            )}
            <TableRow>
              <StyledTableCell sx={{ width: "2.5rem" }}>#</StyledTableCell>
              <StyledTableCell align="left">Entregable</StyledTableCell>
              <StyledTableCell align="left">Evidencia</StyledTableCell>
              <StyledTableCell>Prioridad</StyledTableCell>
              <StyledTableCell>Ponderación</StyledTableCell>
              {activeComment ? (
                <StyledTableCell align="center">Comentarios</StyledTableCell>
              ) : (
                <>
                  <StyledTableCell>Responsable</StyledTableCell>
                  <StyledTableCell>Fecha Inicio</StyledTableCell>
                  <StyledTableCell>Fecha Termino</StyledTableCell>
                  <StyledTableCell>Fecha Real</StyledTableCell>
                  <StyledTableCell>Avance</StyledTableCell>
                  <StyledTableCell>Comentarios</StyledTableCell>
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
                <StyledTableCell>{item.evidencia}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.prioridad}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.ponderacion}
                </StyledTableCell>
                {activeComment ? (
                  <StyledTableCell>{item.comentarios}</StyledTableCell>
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
                      </>
                    ) : (
                      <>
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
