var config = require('../../config/dbconfig');
const sql = require('mssql');

async function getWarehouseList(warehouse) {
    try {
        let pool = await sql.connect(config);
        let getWarehouseList = await pool.request()
            .input('fac_cd', sql.VarChar, warehouse.factoryCode)
            .input('wh_cd', sql.VarChar, warehouse.warehouseCode)
            .input('flag', sql.VarChar, warehouse.flag)
            .input('reg_id', sql.Int, warehouse.regID)
            .execute('SNSPOPINC_GetWhCd');
        return getWarehouseList.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getWarehouseList: getWarehouseList,
}