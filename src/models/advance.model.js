export const getAdvance = async (conn, idEntregable) => {
  const { data } = await conn.query(`
    SELECT a.id, name, idEntregable, idMaquina, idFase, responsable, fecha_inicio, fecha_termino, fecha_real, avance, comentarios
    FROM vki40_maquinas_PR AS m
    INNER JOIN vki40_avances AS a ON m.id = a.idMaquina
    WHERE a.idEntregable = ${idEntregable};
    `);
  return data;
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
