module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
      SELECT * FROM vki40_entregables
      WHERE idProyecto = ${idProyecto};
    `);
  return data;
};
module.exports.insertShippable = async (
  conn,
  { nombre, evidencia, prioridad, comentarios, idExpectativa, idProyecto }
) => {
  const {
    info: { insertId },
  } = await conn.query(`
      INSERT INTO vki40_entregables (fecha, nombre, evidencia, prioridad, comentarios, idExpectativa, idProyecto)
      VALUES (GETDATE(), '${nombre}', '${evidencia}', '${prioridad}','${comentarios}', ${idExpectativa}, ${idProyecto});
    `);

  const { data } = await conn.query(`
      SELECT * FROM vki40_entregables WHERE id = ${insertId};
    `);

  return data[0];
};
module.exports.updateShippable = async (
  conn,
  { nombre, evidencia, prioridad, comentarios, idEntregable }
) => {
  await conn.query(`
      UPDATE vki40_entregables
      SET
        fecha = GETDATE(),
        nombre = '${nombre}',
        evidencia = '${evidencia}',
        prioridad = '${prioridad}',
        comentarios = '${comentarios}'
      WHERE id= ${idEntregable};
    `);

  const { data } = await conn.query(`
      SELECT * FROM vki40_entregables WHERE id = ${idEntregable};
    `);

  return data[0];
};

module.exports.deleteShippable = async (conn, { idEntregable }) => {
  await conn.query(`
    DELETE FROM vki40_avances WHERE idEntregable = ${idEntregable};
  `);

  await conn.query(`
    DELETE FROM vki40_entregables WHERE id = ${idEntregable};
  `);

  return idEntregable;
};
