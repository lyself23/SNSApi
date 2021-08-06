var config = require('../../config/DBConfig');
const sql = require('mssql');

async function getCode(code) {
    try {
        let pool = await sql.connect(config);
        let request = await pool.request()
            .input('tableNm', sql.VarChar, code.tableNm)
            .input('work_dt', sql.DateTime, code.work_dt)
            .query("select codeNo = dbo.fnCodeNo(@tableNm, @work_dt)");
        return request.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCode: getCode
}