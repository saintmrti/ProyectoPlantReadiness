import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ProductsTable({
  data,
  idMaquina,
  handleOnClickEditProd,
  handleOnClickDeleteProd,
}) {
  return (
    <TableContainer component={Paper} sx={{ minWidth: 200, mr: 2 }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={2}>
              <div className="flex items-center justify-center">
                <Typography>{data[0]?.nombre}</Typography>
                <IconButton
                  sx={{ ml: "auto" }}
                  onClick={() => handleOnClickEditProd(parseInt(idMaquina))}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => handleOnClickDeleteProd(parseInt(idMaquina))}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <TableCell>Productos</TableCell>
            <TableCell align="center">Metros a fabricar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row?.producto}</TableCell>
              <TableCell align="center">{row.mts_fabricar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
