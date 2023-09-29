module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
      SELECT * FROM vki40_Readiness_champions
      WHERE idProyecto = ${idProyecto};
    `);
  return data;
};

module.exports.insertChampion = async (
  conn,
  { nombre, rubro, imagen, idProyecto }
) => {
  const {
    info: { insertId },
  } = await conn.query(`
          INSERT INTO vki40_Readiness_champions (nombre, rubro, imagen, idProyecto)
          VALUES ('${nombre}', '${rubro}', '${imagen}', ${idProyecto});
      `);

  const { data } = await conn.query(`
          SELECT * FROM vki40_Readiness_champions WHERE id = ${insertId};
      `);

  return data[0];
};

module.exports.updateChampion = async (
  conn,
  { nombre, rubro, imagen, idChampion }
) => {
  await conn.query(`
          UPDATE vki40_Readiness_champions
          SET
            nombre = '${nombre}',
            rubro = '${rubro}',
            imagen = '${imagen}'
          WHERE id= ${idChampion};
      `);

  const { data } = await conn.query(`
          SELECT * FROM vki40_Readiness_champions WHERE id = ${idChampion};
      `);

  return data[0];
};

module.exports.deleteChampion = async (conn, { idChampion }) => {
  await conn.query(`
    DELETE FROM vki40_Readiness_champions WHERE id = ${idChampion};
  `);

  return idChampion;
};
