export const getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT a.id, a.idEntregable, a.idFase, f.idMaquina, f.idGrupo, a.responsable,
    a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios, e.expectativa
    FROM vki40_avances AS a
    INNER JOIN vki40_entregables AS e ON a.idEntregable = e.id
    INNER JOIN vki40_fases AS f ON a.idFase = f.id;
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
