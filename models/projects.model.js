module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT * FROM vki40_Readiness_proyectos;
  `);
  return data;
};

module.exports.insertProject = async (conn, { nombre, icono, idProyecto }) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_Readiness_proyectos (nombre, icono, idProyecto)
        VALUES ('${nombre}', '${icono}', ${idProyecto});
    `);

  const { data } = await conn.query(`
        SELECT * FROM vki40_Readiness_proyectos WHERE id = ${insertId};
    `);

  return data[0];
};

module.exports.updateProject = async (
  conn,
  { id, nombre, icono, idProyecto }
) => {
  await conn.query(`
          UPDATE vki40_Readiness_proyectos
          SET
            nombre = '${nombre}',
            icono = '${icono}',
            idProyecto = ${idProyecto}
          WHERE id= ${id};
      `);

  const { data } = await conn.query(`
          SELECT * FROM vki40_Readiness_proyectos WHERE id = ${id};
      `);

  return data[0];
};

module.exports.deleteProject = async (conn, { idProyecto }) => {
  await conn.query(`
    DELETE FROM vki40_Readiness_proyectos WHERE id = ${idProyecto};
  `);

  return idProyecto;
};
