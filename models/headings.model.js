module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_rubros;
    `);
  return data;
};

module.exports.insertHeading = async (conn, { name }) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_rubros (rubro)
        VALUES ('${name}');
    `);

  const { data } = await conn.query(`
        SELECT * FROM vki40_rubros WHERE id = ${insertId};
    `);

  return data;
};
