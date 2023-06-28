export const getSummary = async (conn) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_expectativas;
    `);
  return data;
};

export const insertExpectancy = async (conn, { expectancy, area }) => {
  const { data } = await conn.query(`
        INSERT INTO vki40_expectativas (fecha, expectativa, rubro)
        VALUES (GETDATE(), '${expectancy}', ${area});
    `);
  return data;
};
