export const getSummary = async (conn) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_entregables;
    `);
  return data;
};

export const insertShippable = async (
  conn,
  { nombre, evidencia, prioridad, ponderacion, comentarios, idExpectativa }
) => {
  const { data } = await conn.query(`
    INSERT INTO vki40_entregables (fecha, nombre, evidencia, prioridad, ponderacion, comentarios, idExpectativa)
    VALUES (GETDATE(), '${nombre}', '${evidencia}', '${prioridad}', ${ponderacion},'${comentarios}', ${idExpectativa});

    SELECT TOP 1 * FROM vki40_entregables ORDER BY id DESC;
      `);

  return data[0];
};
