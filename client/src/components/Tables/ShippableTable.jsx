import { Table } from "@rewind-ui/core";
import _ from "lodash";

const ShippableTable = ({
  data,
  fases,
  activeIndex,
  advance,
  activeComment,
}) => {
  return (
    <>
      <Table size="sm">
        <Table.Thead>
          {!activeComment && (
            <Table.Tr>
              <Table.Th colSpan={5}></Table.Th>
              <Table.Th colSpan={6}>
                {fases[activeIndex]?.fase} <br /> {fases[activeIndex]?.maquina}
              </Table.Th>
            </Table.Tr>
          )}
          <Table.Tr>
            <Table.Th className="w-10">#</Table.Th>
            <Table.Th align="left">Entregable</Table.Th>
            <Table.Th align="left">Evidencia</Table.Th>
            <Table.Th>Prioridad</Table.Th>
            <Table.Th>Ponderación</Table.Th>
            {activeComment ? (
              <Table.Th>Comentarios</Table.Th>
            ) : (
              <>
                <Table.Th>Responsable</Table.Th>
                <Table.Th>Fecha Inicio</Table.Th>
                <Table.Th>Fecha Termino</Table.Th>
                <Table.Th>Fecha Real</Table.Th>
                <Table.Th>Avance</Table.Th>
                <Table.Th>Comentarios</Table.Th>
              </>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {_.map(data, (item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td className="w-10" align="center">
                {index + 1}
              </Table.Td>
              <Table.Td>{item.nombre}</Table.Td>
              <Table.Td>{item.evidencia}</Table.Td>
              <Table.Td align="center">{item.prioridad}</Table.Td>
              <Table.Td align="center">{item.ponderacion}</Table.Td>
              {activeComment ? (
                <Table.Td>{item.comentarios}</Table.Td>
              ) : (
                <>
                  {advance &&
                  advance[item.id] &&
                  advance[item.id].length > 0 ? (
                    <>
                      <Table.Td>
                        {
                          advance[item.id].find(
                            (obj) =>
                              obj.idMaquina === fases[activeIndex]?.idMaquina
                          )?.responsable
                        }
                      </Table.Td>
                      <Table.Td align="center">
                        {
                          advance[item.id].find(
                            (obj) =>
                              obj.idMaquina === fases[activeIndex]?.idMaquina
                          )?.fecha_inicio
                        }
                      </Table.Td>
                      <Table.Td align="center">
                        {
                          advance[item.id].find(
                            (obj) =>
                              obj.idMaquina === fases[activeIndex]?.idMaquina
                          )?.fecha_termino
                        }
                      </Table.Td>
                      <Table.Td align="center">
                        {
                          advance[item.id].find(
                            (obj) =>
                              obj.idMaquina === fases[activeIndex]?.idMaquina
                          )?.fecha_real
                        }
                      </Table.Td>
                      <Table.Td align="center">
                        {
                          advance[item.id].find(
                            (obj) =>
                              obj.idMaquina === fases[activeIndex]?.idMaquina
                          )?.avance
                        }
                      </Table.Td>
                      <Table.Td>
                        {
                          advance[item.id].find(
                            (obj) =>
                              obj.idMaquina === fases[activeIndex]?.idMaquina
                          )?.comentarios
                        }
                      </Table.Td>
                    </>
                  ) : (
                    <>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </>
                  )}
                </>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default ShippableTable;
