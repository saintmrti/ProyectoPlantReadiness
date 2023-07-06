import { Table } from "@rewind-ui/core";
import _ from "lodash";

// eslint-disable-next-line react/prop-types
const MachineTable = ({ data }) => {
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="w-10">#</Table.Th>
            <Table.Th align="left">Maquina</Table.Th>
            <Table.Th align="left">Responsable</Table.Th>
            <Table.Th align="left">Fecha Inicio</Table.Th>
            <Table.Th align="left">Fecha Termino</Table.Th>
            <Table.Th align="left">Fecha Real</Table.Th>
            <Table.Th align="center">Avance</Table.Th>
            <Table.Th align="left">Comentarios</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {_.map(data, (row, index) => (
            <Table.Tr key={index}>
              <Table.Td className="w-10" align="center">
                {index + 1}
              </Table.Td>
              <Table.Td align="left">{row.maquina}</Table.Td>
              <Table.Td align="left">{row.responsable}</Table.Td>
              <Table.Td align="left">{row.fechaInicio}</Table.Td>
              <Table.Td align="left">{row.fechaTermino}</Table.Td>
              <Table.Td align="left">{row.fechaReal}</Table.Td>
              <Table.Td align="center">{row.avance + "%"}</Table.Td>
              <Table.Td align="left">{row.comentarios}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default MachineTable;
