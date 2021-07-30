var config = require('../../config/DBConfig');
const sql = require('mssql');

async function LogIn(user) {
    try {
        let pool = await sql.connect(config);
        let logIn = await pool.request()
            .input('SNSID', sql.VarChar, user.id)
            .input('SNSPW', sql.VarChar, user.password)
            .execute('SNSPOP_LOGIN');
        return logIn.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

// async function LogIn(user) {
//     try {
//         let pool = await sql.connect(config);
//         let logIn = await pool.request()
//             .input('SNSID', sql.VarChar, user.id)
//             .input('SNSPW', sql.VarChar, user.password)
//             .query("exec SNSPOP_LOGIN @SNSID, @SNSPW");
//             //.execute('SNSPOP_LOGIN');
//         return logIn.recordsets;
//     }
//     catch (err) {
//         console.log(err);
//     }
// }


// async function getUsers() {
//     try {
//         let pool = await sql.connect(config);
//         let users = await pool.request().query("SELECT * from scu100");
//         return users.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// async function getUser(regID) {
//     try {
//         let pool = await sql.connect(config);
//         let users = await pool.request()
//             .input('input_parameter', sql.Int, regID)
//             .query("SELECT * from scu100 where reg_id = @input_parameter");
//         return users.recordsets;

//     }
//     catch (error) {
//         console.log(error);
//     }
// }



module.exports = {
    LogIn: LogIn,
  //  getUser : getUser,
 //   getUsers : getUsers
}