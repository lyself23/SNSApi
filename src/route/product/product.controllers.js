const config = require('../../config/DBConfig');
const sql = require('mssql');
const { response } = require('express');

async function getItems() {
    try {
        const pool = await sql.connect(config);
        const products = await pool.request().query("SELECT * from DMA100");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getItem(itemID) {
    try {
        const pool = await sql.connect(config);
        const products = await pool.request()
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
        const pool = await sql.connect(config);
        const getStockList = await pool.request()
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

async function workMoveProduct(product) {    
    let pool = await sql.connect(config);
    let transaction = pool.transaction();    

    var query = await makeQuery("SNSAPP_LEM100_Work", product);
    var result = {
        status : false,
        message : ""
    };

    try {
        const beginTran = await transaction.begin()
        const request = new sql.Request(transaction);
        await request.query(query)       
        
        result.status = true;
        transaction.commit();     
        return result; 
    } catch (err) {
        result.status = false;
        result.message = JSON.stringify(err.message);
        transaction.rollback();  
        return result; 
    } 

    // const beginTran = await transaction.begin()
    // const request = new sql.Request(transaction);
    // await request.query(query)         
    //     .then(() => {            
    //         result.status = true;
    //         transaction.commit();     
                  
    //     })
    //     .catch((err) => {            
    //         result.status = false;
    //         result.message = JSON.stringify(err.message);
    //         transaction.rollback();  
    //     });
    //     return result; 
}


async function makeQuery(spName, product) {
    var query = "";

    product.map(value => {
        query += "EXEC " + spName + " ";
        query += "'" + value.out_fac + "', "
        query += "'" + value.in_fac + "', "
        query += "'" + value.mov_no + "', "
        query += "'" + value.out_dt + "', "
        query += "'" + value.out_wh + "', "
        query += "'" + value.in_wh + "', "
        query += "'" + value.itm_id + "', "
        query += "'" + value.mng_no + "', "
        query += value.box_sq + ", "
        query += "'" + value.box_no + "', "
        query += "'" + value.location + "', "
        query += value.qty + ", "
        query += "'" + value.rfid + "', "
        query += "'" + value.rmks + "', "
        query += "'" + value.reg_id + "'"
        query += ";"
    });    

    return query;
}

module.exports = {
    getItems: getItems,
    getItem : getItem,
    getStockList : getStockList,
    workMoveProduct : workMoveProduct
}