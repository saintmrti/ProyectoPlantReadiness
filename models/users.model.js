module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data: dataUsers } = await conn.query(`
      SELECT idUsuario, c_nombre, c_apellido_pat, c_apellido_mat, n_pr
      FROM vki40_usuarios
      WHERE n_pr IN (1,2);
    `);

  const { data: dataAccess } = await conn.query(`
      SELECT * FROM vki40_Readiness_usuarios_proyectos
      WHERE idProyecto = ${idProyecto};
    `);

  return {
    dataUsers,
    dataAccess,
  };
};

module.exports.updateUsers = async (conn, { users, idProyecto }) => {
  await conn.query(`
      DELETE FROM vki40_Readiness_usuarios_proyectos
      WHERE idProyecto = ${idProyecto};
    `);

  if (users.length > 0) {
    await conn.query(`
        INSERT INTO vki40_Readiness_usuarios_proyectos (fecha, idUsuario, idProyecto, n_activo) VALUES
        ${users
          .map((idUsuario) => `(GETDATE(), ${idUsuario}, ${idProyecto}, 1)`)
          .join(",")}
      `);
  }

  const { data: dataUsers } = await conn.query(`
      SELECT idUsuario, c_nombre, c_apellido_pat, c_apellido_mat, n_pr
      FROM vki40_usuarios
      WHERE n_pr IN (1,2);
    `);

  const { data: dataAccess } = await conn.query(`
      SELECT * FROM vki40_Readiness_usuarios_proyectos;
    `);

  return {
    dataUsers,
    dataAccess,
  };
};
