module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
    SELECT f.id, f.idMaquina, f.idGrupo, f.fase, m.maquina
    FROM vki40_fases AS f
    INNER JOIN vki40_maquinas_PR AS m ON f.idMaquina = m.id
    WHERE f.idProyecto = ${idProyecto};
    `);
  return data;
};

module.exports.insertPhase = async (conn, modifiedArray) => {
  const insertPromises = modifiedArray.map(async (item) => {
    const { idMaquina, idGrupo, fase, idProyecto } = item;
    const {
      info: { insertId },
    } = await conn.query(`
      INSERT INTO vki40_fases (idMaquina, idGrupo, fase, idProyecto)
      VALUES(${idMaquina}, ${idGrupo}, '${fase}', ${idProyecto});
    `);

    const { data } = await conn.query(`
      SELECT f.id, f.idMaquina, f.idGrupo, f.fase, m.maquina
      FROM vki40_fases AS f
      INNER JOIN vki40_maquinas_PR AS m ON f.idMaquina = m.id
      WHERE f.id= ${insertId};
    `);

    return data[0];
  });

  const results = await Promise.all(insertPromises);
  return results;
};

module.exports.updatePhase = async (conn, { idGrupo, fase, idProyecto }) => {
  await conn.query(`
    UPDATE vki40_fases
    SET 
      fase= '${fase}'
    WHERE idGrupo= ${idGrupo} AND idProyecto = ${idProyecto};
  `);

  const { data } = await conn.query(`
    SELECT f.id, f.idMaquina, f.idGrupo, f.fase, m.maquina
    FROM vki40_fases AS f
    INNER JOIN vki40_maquinas_PR AS m ON f.idMaquina = m.id
    WHERE f.idProyecto = ${idProyecto} AND f.idGrupo = ${idGrupo};
  `);

  return data;
};

module.exports.deletePhase = async (conn, { idGrupo, idProyecto }) => {
  await conn.query(`
    DELETE FROM vki40_avances
    WHERE idFase IN (SELECT id FROM vki40_fases WHERE idGrupo = ${idGrupo});
  `);
  await conn.query(`
    DELETE FROM vki40_fases WHERE idGrupo = ${idGrupo} AND idProyecto = ${idProyecto};
  `);

  return idGrupo;
};
