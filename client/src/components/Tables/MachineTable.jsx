import _ from "lodash";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
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

const MachineTable = ({ tableValues }) => (
  <div style={{ padding: "0px 10px" }}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell sx={{ width: "140px" }}></StyledTableCell>
          <StyledTableCell
            align="center"
            colSpan={2}
            sx={{ fontSize: 10, padding: 0 }}
          >
            Seguridad
          </StyledTableCell>
          <StyledTableCell
            align="center"
            colSpan={2}
            sx={{ fontSize: 10, padding: 0 }}
          >
            Calidad
          </StyledTableCell>
          <StyledTableCell
            align="center"
            colSpan={2}
            sx={{ fontSize: 10, padding: 0 }}
          >
            RH
          </StyledTableCell>
          <StyledTableCell
            align="center"
            colSpan={2}
            sx={{ fontSize: 10, padding: 0 }}
          >
            Producción
          </StyledTableCell>
          <StyledTableCell
            align="center"
            colSpan={2}
            sx={{ fontSize: 10, padding: 0 }}
          >
            Mtto
          </StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell sx={{ width: "140px" }}></StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Plan
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Real
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Plan
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Real
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Plan
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Real
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Plan
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Real
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Plan
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
            Real
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableValues &&
          _.map(tableValues, (item, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell
                component="th"
                scope="row"
                sx={{ fontSize: 10, padding: 0 }}
              >
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Seguridad?.plan ? `${item.Seguridad.plan}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Seguridad?.real ? `${item.Seguridad.real}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Calidad?.plan ? `${item.Calidad.plan}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Calidad?.real ? `${item.Calidad.real}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Rh?.plan ? `${item.rh.plan}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Rh?.real ? `${item.rh.real}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Produccion?.plan ? `${item.produccion.plan}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.Produccion?.real ? `${item.produccion.real}%` : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.mantenimiento?.plan
                  ? `${item.Mantenimiento.plan}%`
                  : "0%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.mantenimiento?.real
                  ? `${item.Mantenimiento.real}%`
                  : "0%"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
      </TableBody>
    </Table>
  </div>
);

export default MachineTable;
