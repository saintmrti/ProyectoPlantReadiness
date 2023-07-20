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
    const {
      info: { insertId },
    } = await conn.query(`
      INSERT INTO vki40_fases (idMaquina, idGrupo, fase)
      VALUES(${idMaquina}, ${idGrupo}, '${fase}');
    `);

    const { data } = await conn.query(`
      SELECT * FROM vki40_fases WHERE id = ${insertId};
    `);

    return data[0];
  });

  const results = await Promise.all(insertPromises);
  return results;
};
