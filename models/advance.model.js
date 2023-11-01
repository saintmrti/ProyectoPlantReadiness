module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
    SELECT a.id, a.idEntregable, m.idFase, a.idMaquina, a.responsable,
    a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios, e.idExpectativa
    FROM vki40_Readiness_avances AS a
    INNER JOIN vki40_Readiness_entregables AS e ON a.idEntregable = e.id
    INNER JOIN vki40_Readiness_maquinas AS m ON a.idMaquina = m.id
    WHERE a.idProyecto = ${idProyecto};
    `);
  return data;
};

module.exports.insertAdvance = async (conn, modifiedArray) => {
  const insertPromises = modifiedArray.map(async (item) => {
    const {
      idEntregable,
      idProyecto,
      idMaquina,
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
      INSERT INTO vki40_Readiness_avances (idEntregable, idMaquina, responsable, fecha_inicio, fecha_termino, fecha_real, avance, comentarios, idProyecto)
      VALUES (${idEntregable}, ${idMaquina}, ${responsable}, ${fecha_inicio}, ${fecha_termino}, ${fecha_real}, ${avance}, ${comentarios}, ${idProyecto});
    `);

    const { data } = await conn.query(`
      SELECT a.id, a.idEntregable, m.idFase, a.idMaquina, a.responsable,
      a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios, e.idExpectativa
      FROM vki40_Readiness_avances AS a
      INNER JOIN vki40_Readiness_entregables AS e ON a.idEntregable = e.id
      INNER JOIN vki40_Readiness_maquinas AS m ON a.idMaquina = m.id
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
      UPDATE vki40_Readiness_avances
      SET
        responsable = ${responsable !== null ? `'${responsable}'` : null}, 
        fecha_inicio = ${fecha_inicio !== null ? `'${fecha_inicio}'` : null},
        fecha_termino = ${fecha_termino !== null ? `'${fecha_termino}'` : null},
        fecha_real = ${fecha_real !== null ? `'${fecha_real}'` : null},
        avance = ${avance},
        comentarios = ${comentarios !== null ? `'${comentarios}'` : null}
      WHERE id = ${idAvance};
    `);

  const { data } = await conn.query(`
      SELECT a.id, a.idEntregable, m.idFase, a.idMaquina, a.responsable,
      a.fecha_inicio, a.fecha_termino, a.fecha_real, a.avance, a.comentarios, e.idExpectativa
      FROM vki40_Readiness_avances AS a
      INNER JOIN vki40_Readiness_entregables AS e ON a.idEntregable = e.id
      INNER JOIN vki40_Readiness_maquinas AS m ON a.idMaquina = m.id
      WHERE a.id= ${idAvance};
    `);

  return data[0];
};
