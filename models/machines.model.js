module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
    SELECT * FROM vki40_Readiness_maquinas WHERE idProyecto = ${idProyecto};
    `);
  return data;
};

module.exports.insertMachine = async (conn, newMachines) => {
  const insertPromises = newMachines.map(async (item) => {
    const { machine, idFase, idProyecto } = item;

    const {
      info: { insertId },
    } = await conn.query(`
          INSERT INTO vki40_Readiness_maquinas (maquina, idFase, idProyecto)
          VALUES('${machine}', ${idFase}, ${idProyecto});
    `);

    const { data } = await conn.query(`
      SELECT * FROM vki40_Readiness_maquinas WHERE id = ${insertId};
    `);

    return data[0];
  });

  const results = await Promise.all(insertPromises);
  return results;
};

module.exports.deleteMachine = async (conn, { idMaquina }) => {
  await conn.query(`
      DELETE FROM vki40_Readiness_maquinas WHERE id = ${idMaquina};
  `);
  return idMaquina;
};
