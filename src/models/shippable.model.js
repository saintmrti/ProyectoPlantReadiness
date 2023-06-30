export const getSummary = async (conn) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_entregables;
    `);
  return data;
};

export const insertShippable = async (
  conn,
  { nombre, evidencia, prioridad, ponderacion, comentarios, expectativa }
) => {
  const { data } = await conn.query(`
    INSERT INTO vki40_entregables (fecha, nombre, evidencia, prioridad, ponderacion, comentarios, expectativa)
    VALUES (GETDATE(), '${nombre}', '${evidencia}', '${prioridad}', ${ponderacion},'${comentarios}', ${expectativa});
      `);
  return data;
};
