module.exports.getSummary = async (conn, { idProyecto }) => {
  const { data } = await conn.query(`
        SELECT * FROM vki40_rubros
        WHERE idProyecto = ${idProyecto};
    `);
  return data;
};

module.exports.insertHeading = async (conn, { name, idProyecto }) => {
  const {
    info: { insertId },
  } = await conn.query(`
        INSERT INTO vki40_rubros (rubro, idProyecto)
        VALUES ('${name}', ${idProyecto});
    `);

  const { data } = await conn.query(`
        SELECT * FROM vki40_rubros WHERE id = ${insertId};
    `);

  return data[0];
};

module.exports.updateHeading = async (conn, { id, name }) => {
  await conn.query(`
        UPDATE vki40_rubros
        SET rubro = '${name}'
        WHERE id = ${id};
    `);
  const { data } = await conn.query(`
        SELECT * FROM vki40_rubros WHERE id = ${id};
    `);
  return data[0];
};

module.exports.deleteHeading = async (conn, { idRubro }) => {
  await conn.query(`
    DECLARE @rubroID INT;

    SET @rubroID = ${idRubro};
    
    DELETE FROM vki40_avances WHERE idEntregable IN (
      SELECT id FROM vki40_entregables WHERE idExpectativa IN (
        SELECT id FROM vki40_expectativas WHERE rubro = @rubroID
      )
    );
    
    DELETE FROM vki40_entregables WHERE idExpectativa IN (
      SELECT id FROM vki40_expectativas WHERE rubro = @rubroID
    );
    
    DELETE FROM vki40_expectativas WHERE rubro = @rubroID;
    
    DELETE FROM vki40_rubros WHERE id = @rubroID;
    `);
  return idRubro;
};
