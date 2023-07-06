export const getAdvance = async (conn, idEntregable) => {
  const { data: advance } = await conn.query(`
    SELECT a.id, m.maquina, a.idEntregable, a.idMaquina, a.idFase,  a.responsable, a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios
    FROM vki40_maquinas_PR AS m
    INNER JOIN vki40_avances AS a ON m.id = a.idMaquina
    WHERE a.idEntregable = ${idEntregable};
    `);

  const { data: shippable } = await conn.query(`
    SELECT * FROM vki40_entregables WHERE id= ${idEntregable};
  `);
  return {
    advance,
    shippable,
  };
};

export const insertAdvance = async (
  conn,
  {
    idEntregable,
    idMaquina,
    idFase,
    responsable,
    fecha_inicio,
    fecha_termino,
    fecha_real,
    avance,
    comentarios,
  }
) => {
  const { data } = await conn.query(`
    INSERT INTO vki40_avances (idEntregable, idMaquina, idFase, responsable, fecha_inicio, fecha_termino, fecha_real, avance, comentarios)
    VALUES(${idEntregable}, ${idMaquina}, ${idFase}, '${responsable}', '${fecha_inicio}', '${fecha_termino}', '${fecha_real}', ${avance}, '${comentarios}');
    `);
  return data;
};
