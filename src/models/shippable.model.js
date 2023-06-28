export const getSummary = async (conn) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_entregables;
    `);
  return data;
};

export const insertShippable = async (
  conn,
  { name, evidencia, prioridad, ponderacion, comentarios, expectativa }
) => {
  const { data } = await conn.query(`
    INSERT INTO vki40_entregables (fecha, name, evidencia, prioridad, ponderacion, comentarios, expectativa)
    VALUES (GETDATE(), '${name}', '${evidencia}', '${prioridad}', ${ponderacion},'${comentarios}', ${expectativa});
      `);
  return data;
};
