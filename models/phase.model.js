module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_Readiness_fases
        WHERE idProyecto = ${idProyecto};
    `);
  return data;
};

module.exports.insertPhase = async (conn, { idProyecto, fase }) => {
  const {
    info: { insertId },
  } = await conn.query(`
    INSERT INTO vki40_Readiness_fases (fase, idProyecto)
    VALUES('${fase}', ${idProyecto});
  `);

  const { data } = await conn.query(`
    SELECT * FROM vki40_Readiness_fases WHERE id = ${insertId};
  `);

  return data[0];
};

module.exports.updatePhase = async (conn, { idFase, fase }) => {
  await conn.query(`
    UPDATE vki40_Readiness_fases
    SET 
      fase= '${fase}'
    WHERE id= ${idFase};
  `);

  const { data } = await conn.query(`
    SELECT * FROM vki40_Readiness_fases WHERE id = ${idFase};
  `);

  return data[0];
};

module.exports.deletePhase = async (conn, { idFase }) => {
  await conn.query(`
    DELETE FROM vki40_Readiness_avances
    WHERE idMaquina IN (SELECT id FROM vki40_Readiness_maquinas WHERE idFase = ${idFase});
  `);
  await conn.query(`
    DELETE FROM vki40_Readiness_maquinas WHERE idFase = ${idFase};
  `);
  await conn.query(`
    DELETE FROM vki40_Readiness_fases WHERE id = ${idFase};
  `);
  return idFase;
};
