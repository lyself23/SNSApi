module.exports = function(app)
{
     const sql = require('mssql');
    var config = {
        user: 'emaxerp',
        password: 'SNS@!mgr2018',
        server: '210.101.190.138',
        database: 'snserp',
        options : {
            trustedconnection : true,
            enableArithAbort : true
        }
    };

    sql.connect(config).then(pool => {
        // GET ALL USERS
        app.get('/api/users', function(req, res){
           return pool.request()
            .query('select * from scu100')
            .then(result => {
                res.json(result.recordset);
                res.end();
            });
        });

        
        // GET SINGLE USERS BY USER_ID
        app.get('/api/users/:user_id', function(req, res){
           return pool.request()
            .input('input_parameter', sql.Int, req.params.user_id)
            .query('select * from scu100 where reg_id = @input_parameter')
            .then(result => {
                res.json(result.recordset);
                res.end();
            });
        });

        // GET SINGLE USERS BY USER_ID
        app.get('/api/users/empno/:emp_no', function(req, res){
            return pool.request()
             .input('input_parameter', req.params.emp_no)
             .query('select * from scu100 where emp_no = @input_parameter')
             .then(result => {
                 res.json(result.recordset);
                 res.end();
             });
         });

        // GET SINGLE USERS ID BY NAME
        app.get('/api/users/userid/:name', function(req, res){
           return pool.request()
            .input('input_parameter', req.params.name)
           // console.log(req.params.name);
            .query('select * from scu100 where nm = @input_parameter')
            .then(result => {
                res.json(result.recordset);
                res.end();
            });
        });

        // GET SINGLE USERS ID BY NAME
        app.get('/api/users/login/:userno/:userpassword', function(req, res){
            return pool.request()
             .input('input_parameter', req.params.userno)
             .input('input_parameter2', req.params.userpassword)            
             .query('exec SNSPOP_LOGIN @input_parameter, @input_parameter2')
             .then(result => {
                 res.json(result.recordset);
                 res.end();
             });
         });

        // // CREATE USERS
        // app.post('/api/users', function(req, res){
        //     return pool.request()
        //     .input('input_parameter', req.body.name) // json body에서 name 항목을 찾아서 할당
        //     .query('INSERT INTO MemberInfo (Name) VALUES (@input_parameter)')
        //     .then(result => {
        //         res.json(result.recordset);
        //         res.end();
        //     });
        // });     

        // // UPDATE THE USERS
        // app.put('/api/users/:user_id', function(req, res){
        //    return pool.request()
        //     .input('input_parameter_user_id', sql.Int, req.params.user_id)
        //     .input('input_parameter_name', req.body.name)
        //     .query('UPDATE MemberInfo SET Name = @input_parameter_name WHERE MemberID = @input_parameter_user_id')
        //     .then(result => {
        //         res.json(result.recordset);
        //         res.end();
        //     });
        // });

        // // DELETE USERS
        // app.delete('/api/users/:user_id', function(req, res){
        //     return pool.request()
        //     .input('input_parameter', sql.Int, req.params.user_id)
        //     .query('DELETE FROM MemberInfo WHERE MemberID = @input_parameter')

        //     .then(result => {
        //         res.json(result.recordset);
        //         res.end();
        //     });
        // });
    });
}
