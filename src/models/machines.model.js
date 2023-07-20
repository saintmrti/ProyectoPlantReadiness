export const getSummary = async (conn) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_maquinas_PR;
    `);
  return data;
};

export const insertMachine = async (conn, { machine }) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_maquinas_PR (maquina)
        VALUES('${machine}');
    `);

  const { data } = await conn.query(`
      SELECT * FROM vki40_maquinas_PR WHERE id = ${insertId};
    `);

  return data[0];
};
