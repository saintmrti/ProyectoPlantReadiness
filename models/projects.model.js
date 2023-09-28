module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT
    Proy.*,
    (SELECT COUNT(*) FROM vki40_Readiness_avances E WHERE E.idProyecto = Proy.id AND E.avance = 100) as [Real],
    (SELECT COUNT(*) FROM vki40_Readiness_avances E WHERE E.idProyecto = Proy.id) as [Plan]
    FROM vki40_Readiness_proyectos Proy;
  `);
  return data;
};

module.exports.insertProject = async (conn, { nombre }) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_Readiness_proyectos (nombre)
        VALUES ('${nombre}');
    `);

  const { data } = await conn.query(`
        SELECT * FROM vki40_Readiness_proyectos WHERE id = ${insertId};
    `);

  return data[0];
};

module.exports.updateProject = async (conn, { id, nombre }) => {
  await conn.query(`
          UPDATE vki40_Readiness_proyectos
          SET
            nombre = '${nombre}'
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

    DELETE FROM vki40_Readiness_avances WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_Readiness_entregables WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_Readiness_expectativas WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_Readiness_rubros WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_Readiness_fases WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_Readiness_maquinas WHERE idProyecto = @proyectoID;

    DELETE FROM vki40_Readiness_proyectos WHERE id = @proyectoID;
  `);

  return idProyecto;
};
