export const getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT f.id, f.idMaquina, f.idGrupo, f.fase, m.maquina
    FROM vki40_fases AS f
    INNER JOIN vki40_maquinas_PR AS m ON f.idMaquina = m.id;
    `);
  return data;
};

export const insertPhase = async (conn, modifiedArray) => {
  const insertPromises = modifiedArray.map(async (item) => {
    const { idMaquina, idGrupo, fase } = item;
    const { data } = await conn.query(`
      INSERT INTO vki40_fases (idMaquina, idGrupo, fase)
      VALUES(${idMaquina}, ${idGrupo}, '${fase}');
    `);
    return data;
  });

  const results = await Promise.all(insertPromises);
  return results;
};
