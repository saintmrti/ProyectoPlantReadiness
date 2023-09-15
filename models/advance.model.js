module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
    SELECT a.id, a.idEntregable, a.idFase, f.idMaquina, f.idGrupo, a.responsable,
    a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios, e.idExpectativa
    FROM vki40_avances AS a
    INNER JOIN vki40_entregables AS e ON a.idEntregable = e.id
    INNER JOIN vki40_fases AS f ON a.idFase = f.id
    WHERE a.idProyecto = ${idProyecto};
    `);

  return data;
};

module.exports.insertAdvance = async (conn, modifiedArray) => {
  const insertPromises = modifiedArray.map(async (item) => {
    const {
      idEntregable,
      idProyecto,
      idFase,
      responsable,
      fecha_inicio,
      fecha_termino,
      fecha_real,
      avance,
      comentarios,
    } = item;
    const {
      info: { insertId },
    } = await conn.query(`
      INSERT INTO vki40_avances (idEntregable, idFase, responsable, fecha_inicio, fecha_termino, fecha_real, avance, comentarios, idProyecto)
      VALUES (${idEntregable}, ${idFase}, ${responsable}, ${fecha_inicio}, ${fecha_termino}, ${fecha_real}, ${avance}, ${comentarios}, ${idProyecto});
    `);

    const { data } = await conn.query(`
      SELECT a.id, a.idEntregable, a.idFase, f.idMaquina, f.idGrupo, a.responsable,
      a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios, e.idExpectativa
      FROM vki40_avances AS a
      INNER JOIN vki40_entregables AS e ON a.idEntregable = e.id
      INNER JOIN vki40_fases AS f ON a.idFase = f.id
      WHERE a.id= ${insertId};
    `);

    return data[0];
  });

  const results = await Promise.all(insertPromises);
  return results;
};

module.exports.updateAdvance = async (conn, modifiedArray) => {
  const {
    idAvance,
    responsable,
    fecha_inicio,
    fecha_termino,
    fecha_real,
    avance,
    comentarios,
  } = modifiedArray;
  await conn.query(`
      UPDATE vki40_avances
      SET
        responsable = ${responsable !== null ? `'${responsable}'` : null}, 
        fecha_inicio = ${fecha_inicio !== null ? `'${fecha_inicio}'` : null},
        fecha_termino = ${fecha_termino !== null ? `'${fecha_termino}'` : null},
        fecha_real = ${fecha_real !== null ? `'${fecha_real}'` : null},
        avance = ${avance !== null ? avance : null},
        comentarios = ${comentarios !== null ? `'${comentarios}'` : null}
      WHERE id = ${idAvance};
    `);

  const { data } = await conn.query(`
      SELECT a.id, a.idEntregable, a.idFase, f.idMaquina, f.idGrupo, a.responsable,
      a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios, e.idExpectativa
      FROM vki40_avances AS a
      INNER JOIN vki40_entregables AS e ON a.idEntregable = e.id
      INNER JOIN vki40_fases AS f ON a.idFase = f.id
      WHERE a.id= ${idAvance};
    `);

  return data[0];
};
