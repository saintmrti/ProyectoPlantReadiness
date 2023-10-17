import { Fragment } from "react";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.hover,
    // color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

const MachineTable = ({ data, rubros }) => {
  const theme = useTheme();
  return (
    <Paper style={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "140px" }}></StyledTableCell>
              {_.map(rubros, (rubro) => (
                <StyledTableCell
                  key={rubro}
                  align="center"
                  colSpan={2}
                  sx={{ fontSize: 10, padding: 0 }}
                >
                  {rubro}
                </StyledTableCell>
              ))}
            </TableRow>
            <TableRow>
              <StyledTableCell sx={{ width: "140px" }}></StyledTableCell>
              {_.map(rubros, (rubro) => (
                <Fragment key={rubro}>
                  <StyledTableCell
                    align="center"
                    sx={{ fontSize: 10, padding: 0 }}
                  >
                    Plan
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontSize: 10, padding: 0 }}
                  >
                    Real
                  </StyledTableCell>
                </Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              _.map(data, (item, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    backgroundColor:
                      item?.tipo === 1
                        ? theme.palette.mode === "light"
                          ? "#F0F0F0"
                          : "#424242"
                        : "inherit",
                  }}
                >
                  <StyledTableCell
                    component="th" 
                    scope="row"
                    sx={{ fontSize: 10, padding: "0 10px" }}
                  >
                    {item.name}
                  </StyledTableCell>
                  {_.map(item?.rubros, (rubro, i) => (
                    <Fragment key={i}>
                      <StyledTableCell
                        align="center"
                        sx={{ fontSize: 10, padding: 0 }}
                      >
                        {`${rubro[1]}%`}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          fontSize: 10,
                          padding: 0,
                          color:
                            rubro[0] !== 0
                              ? rubro[1] > rubro[0]
                                ? "#d32f2f"
                                : "#2e7d32"
                              : "inherit",
                        }}
                      >
                        {`${rubro[0]}%`}
                      </StyledTableCell>
                    </Fragment>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MachineTable;
