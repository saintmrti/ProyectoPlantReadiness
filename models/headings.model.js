module.exports.getSummary = async conn => {
    const { data } = await conn.query(`
        SELECT * FROM vki40_rubros;
    `);
    return data;
}