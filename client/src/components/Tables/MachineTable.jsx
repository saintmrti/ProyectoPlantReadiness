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
    fontSize: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
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
                {item?.seguridad?.plan + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.seguridad?.real + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.calidad?.plan + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.calidad?.real + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.rh?.plan + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.rh?.real + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.produccion?.plan + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.produccion?.real + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.mantenimiento?.plan + "%"}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 10, padding: 0 }}>
                {item?.mantenimiento?.real + "%"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
      </TableBody>
    </Table>
  </div>
);

export default MachineTable;
