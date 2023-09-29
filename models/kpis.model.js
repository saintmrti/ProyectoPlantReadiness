module.exports.getSummary = async (conn, { phase, priority, idProyecto }) => {
  const { data } = await conn.query(`
    exec dbo.sp_vki40_Readiness_scoreCard '${phase}','${priority}', ${idProyecto};
    `);
  return data;
};
