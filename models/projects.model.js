module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT
    Proy.*,
    (SELECT COUNT(*) FROM vki40_avances E WHERE E.idProyecto = Proy.id AND E.avance = 100) as [Real],
    (SELECT COUNT(*) FROM vki40_avances E WHERE E.idProyecto = Proy.id) as [Plan]
    FROM vki40_Readiness_proyectos Proy;
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
    DECLARE @proyectoID INT;

    SET @proyectoID = ${idProyecto};

    DELETE FROM vki40_avances WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_entregables WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_expectativas WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_rubros WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_fases WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_maquinas_PR WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_Readiness_proyectos WHERE id = @proyectoID;
  `);

  return idProyecto;
};
