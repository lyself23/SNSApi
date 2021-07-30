var config = require('../../config/DBConfig');
const sql = require('mssql');

async function getItems() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from DMA100");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getItem(itemID) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('input_parameter', sql.Int, itemID)
            .query("SELECT * from DMA100 where itm_id = @input_parameter");
        return products.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function getStockList(product) {
    try {
        let pool = await sql.connect(config);
        let getStockList = await pool.request()
            .input('std_dt', sql.VarChar, product.standardDate)
            .input('fac_cd', sql.VarChar, product.factoryCode)
            .input('wh_cd', sql.VarChar, product.warehouseCode)
            .input('itm_id', sql.Int, product.itemID)
            .input('mng_no', sql.VarChar, product.lotNo)
            .input('box_sq', sql.Int, product.boxSq)
            .input('box_no', sql.VarChar, product.boxNo)
            .input('rfid', sql.VarChar, product.rfid)
            .execute('SNSPOP_GetStock');
        return getStockList.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getItems: getItems,
    getItem : getItem,
    getStockList : getStockList
}