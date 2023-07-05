export const getSummary = async conn => {
    const { data } = await conn.query(`
        SELECT * FROM vki40_maquinas_PR;
    `);
    return data;
}