module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT * FROM vki40_proyectos_PR;
  `);
  return data;
};

module.exports.insertProject = async (conn, { nombre }) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_proyectos_PR (nombre)
        VALUES ('${nombre}');
    `);

  const { data } = await conn.query(`
        SELECT * FROM vki40_proyectos_PR WHERE idProyecto = ${insertId};
    `);

  return data[0];
};
