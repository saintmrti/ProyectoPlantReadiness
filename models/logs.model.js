module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
      SELECT o.idReg, o.idAvance, o.idUsuario, e.nombre as entregable, m.maquina,
      f.fase, u.c_nombre, u.c_apellido_pat, u.c_apellido_mat,
      o.ult_FechaInicio, o.ult_FechaFin, o.ult_FechaReal,
      o.cont_FechaInicio, o.cont_FechaFin, cont_FechaReal
      FROM vki40_Readiness_logEntregables as o
      INNER JOIN vki40_Readiness_avances as a
      ON o.idAvance = a.id
      INNER JOIN vki40_Readiness_entregables as e
      ON a.idEntregable = e.id
      INNER JOIN vki40_usuarios as u
      ON o.idUsuario = u.idUsuario
      INNER JOIN vki40_Readiness_maquinas as m
      ON a.idMaquina = m.id
      INNER JOIN vki40_Readiness_fases as f
      ON m.idFase = f.id
      WHERE a.idProyecto = ${idProyecto};
    `);
  return data;
};
