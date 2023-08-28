module.exports.getSummary = async (conn, { phase, priority }) => {
  const { data } = await conn.query(`
    exec dbo.sp_vki40_Readiness_scoreCard '${phase}','${priority}';
    `);
  return data;
};
