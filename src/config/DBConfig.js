const config = {
    user: 'sa',
    password: 'snsinc18!',
    server: '203.228.186.44',
    database: 'snserp',
    options : {
        trustedconnection : true,
        enableArithAbort : true,
        // abortTransactionOnError: true // <-- SET XACT_ABORT ON
    }, 
    multipleStatements : true
    // port : 1433
}

module.exports = config;