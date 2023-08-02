export const getSummary = async (conn, { phase, priority, weighting }) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_Readiness_scoreCard
        WHERE fase=0 AND prioridad='P0' AND ponderacion=0;
      `);
  return data;
};
