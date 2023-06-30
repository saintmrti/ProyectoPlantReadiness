import { Table } from "@rewind-ui/core";
import _ from "lodash";

// eslint-disable-next-line react/prop-types
const ShippableTable = ({ data }) => {
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="w-10">#</Table.Th>
            <Table.Th align="left">Entregable</Table.Th>
            <Table.Th align="left">Evidencia</Table.Th>
            <Table.Th align="center">Prioridad</Table.Th>
            <Table.Th align="center">Ponderación</Table.Th>
            <Table.Th>Comentarios</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {_.map(data, (item, index) => (
            <Table.Tr key={index}>
              <Table.Td className="w-10" align="center">
                {index + 1}
              </Table.Td>
              <Table.Td>{item.nombre}</Table.Td>
              <Table.Td>{item.evidencia}</Table.Td>
              <Table.Td align="center">{item.prioridad}</Table.Td>
              <Table.Td align="center">{item.ponderacion}</Table.Td>
              <Table.Td>{item.comentarios}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
        {/* <Table.Tfoot>
          <Table.Tr>
            <Table.Th>Numero</Table.Th>
            <Table.Th align="left">First Name</Table.Th>
            <Table.Th align="left">Last Name</Table.Th>
          </Table.Tr>
        </Table.Tfoot> */}
      </Table>
    </>
  );
};

export default ShippableTable;
