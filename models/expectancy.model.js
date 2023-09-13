module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_expectativas;
    `);
  return data;
};

module.exports.insertExpectancy = async (conn, { expectancy, area }) => {
  const {
    info: { insertId },
  } = await conn.query(`
    INSERT INTO vki40_expectativas (fecha, expectativa, rubro)
    VALUES (GETDATE(), '${expectancy}', ${area});
  `);

  const { data } = await conn.query(`
    SELECT * FROM vki40_expectativas WHERE id = ${insertId};
  `);

  return data[0];
};

module.exports.updateExpectancy = async (
  conn,
  { expectancy, idExpectativa }
) => {
  await conn.query(`
    UPDATE vki40_expectativas
    SET
      fecha = GETDATE(),
      expectativa = '${expectancy}'
    WHERE id= ${idExpectativa};
  `);

  const { data } = await conn.query(`
    SELECT * FROM vki40_expectativas WHERE id = ${idExpectativa};
  `);

  return data[0];
};

module.exports.deleteExpectancy = async (conn, { idExpectativa }) => {
  await conn.query(`
    DELETE FROM vki40_avances WHERE idEntregable IN (SELECT id FROM vki40_entregables WHERE idExpectativa = ${idExpectativa});
  `);

  await conn.query(`
    DELETE FROM vki40_entregables WHERE idExpectativa = ${idExpectativa};
  `);

  await conn.query(`
    DELETE FROM vki40_expectativas WHERE id = ${idExpectativa};
  `);

  return idExpectativa;
};
