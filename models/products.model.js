module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
    SELECT p.id, p.producto, p.mts_fabricar, p.idMaquina, m.nombre, p.idProyecto FROM vki40_Readiness_productos AS p
    INNER JOIN vki40_Readiness_maquinas_productos AS m
    ON p.idMaquina = m.id
    WHERE p.idProyecto= ${idProyecto};
    `);
  return data;
};

module.exports.insertProducts = async (
  conn,
  { products, maquina, idProyecto }
) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_Readiness_maquinas_productos (nombre, idProyecto)
        VALUES ('${maquina}', ${idProyecto});
    `);

  await conn.query(`
      INSERT INTO vki40_Readiness_productos (producto, mts_fabricar, idMaquina, idProyecto) VALUES
      ${products
        .map(
          (product) =>
            `('${product.producto}', ${product.mts}, ${insertId}, ${idProyecto})`
        )
        .join(",")} 
    `);

  const { data } = await conn.query(`
    SELECT p.id, p.producto, p.mts_fabricar, p.idMaquina, m.nombre, p.idProyecto FROM vki40_Readiness_productos AS p
    INNER JOIN vki40_Readiness_maquinas_productos AS m
    ON p.idMaquina = m.id
    WHERE p.idMaquina= ${insertId};
    `);

  return data;
};

module.exports.updateProducts = async (
  conn,
  { products, maquina, idMaquina, idProyecto }
) => {
  await conn.query(`
    UPDATE vki40_Readiness_maquinas_productos SET nombre = '${maquina}' WHERE id = ${idMaquina};
  `);

  await conn.query(`
    DELETE FROM vki40_Readiness_productos WHERE idMaquina = ${idMaquina};
  `);

  await conn.query(`
      INSERT INTO vki40_Readiness_productos (producto, mts_fabricar, idMaquina, idProyecto) VALUES
      ${products
        .map(
          (product) =>
            `('${product.producto}', ${product.mts}, ${idMaquina}, ${idProyecto})`
        )
        .join(",")} 
    `);

  const { data } = await conn.query(`
    SELECT p.id, p.producto, p.mts_fabricar, p.idMaquina, m.nombre, p.idProyecto FROM vki40_Readiness_productos AS p
    INNER JOIN vki40_Readiness_maquinas_productos AS m
    ON p.idMaquina = m.id
    WHERE p.idMaquina= ${idMaquina};
    `);

  return data;
};

module.exports.deleteProducts = async (conn, { idMaquina }) => {
  await conn.query(`
    DELETE FROM vki40_Readiness_productos WHERE idMaquina = ${idMaquina};
  `);

  await conn.query(`
    DELETE FROM vki40_Readiness_maquinas_productos WHERE idMaquina = ${idMaquina};
  `);

  return idMaquina;
};
