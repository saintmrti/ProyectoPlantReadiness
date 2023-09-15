module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_maquinas_PR
        WHERE idProyecto = ${idProyecto};
    `);
  return data;
};

module.exports.insertMachine = async (conn, { machine, idProyecto }) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_maquinas_PR (maquina, idProyecto)
        VALUES('${machine}', ${idProyecto});
    `);

  const { data } = await conn.query(`
      SELECT * FROM vki40_maquinas_PR WHERE id = ${insertId};
    `);

  return data[0];
};

module.exports.deleteMachine = async (conn, { idMaquina }) => {
  await conn.query(`
      DELETE FROM vki40_maquinas_PR WHERE id = ${idMaquina};
  `);
  return idMaquina;
};
