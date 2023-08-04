export const getSummary = async (conn, { phase, priority, weighting }) => {
  const { data } = await conn.query(`
    SELECT * FROM vki40_Readiness_scoreCard
    WHERE fecha= (SELECT MAX(fecha) FROM vki40_Readiness_scoreCard)
    AND fase=${phase} AND prioridad='${priority}' AND ponderacion=${weighting};
    `);
  return data;
};
