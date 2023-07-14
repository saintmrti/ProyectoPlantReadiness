import { Table } from "@rewind-ui/core";
// import { useNavigate } from "react-router-dom";
// import _ from "lodash";

// eslint-disable-next-line react/prop-types
const ShippableTable = ({ data }) => {
  // const navigate = useNavigate();

  return (
    <>
      <Table size="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th colSpan={6} align="center">
              {`Fase ${data.idFase}`} <br /> {`${data.maquina}`}
            </Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Responsable</Table.Td>
            <Table.Td>Fecha Inicio</Table.Td>
            <Table.Td>Fecha Termino</Table.Td>
            <Table.Td>Fecha Real</Table.Td>
            <Table.Td align="center">Avance</Table.Td>
            <Table.Td>Comentarios</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr
          // style={{ cursor: "pointer" }}
          // onClick={() => navigate(`/progreso/${item.id}`)}
          >
            <Table.Td>{data.responsable}</Table.Td>
            <Table.Td>{data.fecha_inicio}</Table.Td>
            <Table.Td>{data.fecha_termino}</Table.Td>
            <Table.Td>{data.fecha_real}</Table.Td>
            <Table.Td align="center">{data.avance + "%"}</Table.Td>
            <Table.Td>{data.comentarios}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
};

export default ShippableTable;
