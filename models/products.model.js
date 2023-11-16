module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
    SELECT p.id, p.producto, p.mts_fabricar, p.herramental, p.idMaquina, m.nombre, m.herramental as disHerramental, p.idProyecto FROM vki40_Readiness_productos AS p
    INNER JOIN vki40_Readiness_maquinas_productos AS m
    ON p.idMaquina = m.id
    WHERE p.idProyecto= ${idProyecto};
    `);
  return data;
};

module.exports.insertProducts = async (
  conn,
  { products, maquina, idProyecto, isTooling }
) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_Readiness_maquinas_productos (nombre, idProyecto, herramental)
        VALUES ('${maquina}', ${idProyecto}, ${isTooling ? 1 : 0});
    `);

  await conn.query(`
      INSERT INTO vki40_Readiness_productos (producto, mts_fabricar, idMaquina, idProyecto, herramental) VALUES
      ${products
        .map(
          (product) =>
            `('${product.producto}', ${product.mts}, ${insertId}, ${idProyecto}, ${product.herramental})`
        )
        .join(",")} 
    `);

  const { data } = await conn.query(`
    SELECT p.id, p.producto, p.mts_fabricar, p.herramental, p.idMaquina, m.nombre, m.herramental as disHerramental, p.idProyecto FROM vki40_Readiness_productos AS p
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
      INSERT INTO vki40_Readiness_productos (producto, mts_fabricar, idMaquina, idProyecto, herramental) VALUES
      ${products
        .map(
          (product) =>
            `('${product.producto}', ${product.mts}, ${idMaquina}, ${idProyecto}, ${product.herramental})`
        )
        .join(",")} 
    `);

  const { data } = await conn.query(`
    SELECT p.id, p.producto, p.mts_fabricar, p.herramental, p.idMaquina, m.nombre, m.herramental as disHerramental, p.idProyecto FROM vki40_Readiness_productos AS p
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
      DELETE FROM vki40_Readiness_maquinas_productos WHERE id = ${idMaquina};
  `);

  return idMaquina;
};
